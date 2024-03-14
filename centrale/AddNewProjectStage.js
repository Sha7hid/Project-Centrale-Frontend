import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import CryptoJS from 'crypto-js';
export default function AddNewProjectStage({navigation}) {

  const [projectTeams, setProjectTeams] = useState([]);
  const [stages, setStages] = useState([]);
  const [selectedProjectTeam, setSelectedProjectTeam] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSelectedProjectTeam('');
    setSelectedStage('');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Fetch project teams
    fetch('https://centrale.onrender.com/project-teams')
      .then(response => response.json())
      .then(data => {
        setProjectTeams(data);
      })
      .catch(error => {
        console.error('Error fetching project teams:', error);
      });

    // Fetch stages
    fetch('https://centrale.onrender.com/stages')
      .then(response => response.json())
      .then(data => {
        setStages(data);
      })
      .catch(error => {
        console.error('Error fetching stages:', error);
      });
  }, []);

  const handleSubmit = () => {
    if (!selectedProjectTeam || !selectedStage) {
      Alert.alert('Fields needed', 'Please select both project team and stage.');
      return;
    }
  
    // Check if the selected project team already has the selected stage assigned to it
    const apiUrl = `https://centrale.onrender.com/projectStage/${selectedProjectTeam}/${selectedStage}`;
  
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.success && data.projectStage) {
        // If the project stage already exists for the selected project team, display an error message
        Alert.alert('Validation Error', 'The selected project team already has the selected stage assigned to it.');
      } else {
        // If the project stage does not exist, proceed with submitting the form
        submitForm();
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      Alert.alert('Error', 'Error checking project stage');
      console.error('Error:', error);
    });
};

const submitForm = () => {
  const apiUrl = 'https://centrale.onrender.com/projectStage';

  const requestData = {
    projectTeamId: selectedProjectTeam,
    stageId: selectedStage
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setSuccess(true);
        Alert.alert('🎊', 'Successfully Added Project Stage');
        onRefresh();
      } else {
        Alert.alert('Error', 'Error Adding Project Stage');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      Alert.alert('Error', 'Error Adding Project Stage');
      console.error('Error:', error);
    });
};
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.textstyles}>Enter Details Of Project Stage</Text>
          <View style={styles.spacetop}></View>
          <Text style={styles.text}>Select Project Team</Text>
          <Picker
            selectedValue={selectedProjectTeam}
            onValueChange={(itemValue, itemIndex) => setSelectedProjectTeam(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a team" value={null}/>
            {projectTeams.map(team => (
              <Picker.Item key={team.projectTeamId} label={team.teamName} value={team.projectTeamId} />
            ))}
          </Picker>
          <View style={styles.spacetop}></View>
          <Text style={styles.text}>Select Stage</Text>
          <Picker
            selectedValue={selectedStage}
            onValueChange={(itemValue, itemIndex) => setSelectedStage(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a stage" value={null}/>
            {stages.map(stage => (
              <Picker.Item key={stage.stageId} label={stage.stageName} value={stage.stageId} />
            ))}
          </Picker>
          <View style={styles.spacetop}></View>
          <Pressable onPress={handleSubmit} style={styles.button2}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3734A9",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 21,
  },
  textstyles: {
    color: "white",
    fontFamily: "league",
    fontSize: 30,
    fontWeight: "500",
    paddingRight: 10,
  },
  picker: {
    height: 50,
    width: 270,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
  },
  spacetop: {
    paddingTop: 30,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#E652FF",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  successText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "green",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
    marginBottom: 10,
  },
});
