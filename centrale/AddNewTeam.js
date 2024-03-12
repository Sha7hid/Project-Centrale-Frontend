import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';

export default function AddNewTeam({navigation}) {
  const [teamData, setTeamData] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [studentsData, setStudentsData] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [userIds, setUserIds] = useState([null]); // Initialize with one null value
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTeamName('');
    setProjectName('');
    setTeacherId(null);
    setUserIds([null]); // Reset to one null value
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSubmit = () => {
    if (!teamName) {
      Alert.alert('Field Needed', 'Please fill in the team name');
      return;
    }
    if (!projectName) {
      Alert.alert('Field Needed', 'Please fill in the project name');
      return;
    }
    if (!teacherId) {
      Alert.alert('Selection needed', 'Please select a teacher');
      return;
    }
    if (userIds.length < 2) {
      Alert.alert('Selection needed', 'At least two students must be selected');
      return;
    }
    const allUserIds = [teacherId, ...userIds.filter(id => id)]; // Append teacherId to userIds array and filter out null values
    const apiUrl = 'https://centrale.onrender.com/create-project-team';
  
    const requestData = {
      userIds: allUserIds,
      teamName: teamName,
      projectName: projectName,
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(teamData => setTeamData(teamData))
      .then(() => {
        Alert.alert('🎊','Successfully Added Team');
        onRefresh();
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };
  
  useEffect(() => {
    // Fetch students data from the API
    const apiUrl = `https://centrale.onrender.com/users`;
     
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setStudentsData(data))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.textstyles}>Enter Details of the Team</Text>
          <View style={styles.spacetop}></View>
          <TextInput style={styles.input} onChangeText={setTeamName} placeholder="Team Name"/>
          <TextInput style={styles.input} onChangeText={setProjectName} placeholder="Project Name"/>
          <Picker
            style={styles.input}
            selectedValue={teacherId}
            onValueChange={setTeacherId}
          >
            <Picker.Item label="Select Teacher" value={null} />
            {studentsData?.filter(user => user.type === 'teacher').map((user) => (
              <Picker.Item key={user.userId} label={user.name} value={user.userId} />
            ))}
          </Picker>
          <View style={styles.spacetop}></View>
          <Text style={styles.textstyles}>Select Students</Text>
          {userIds.map((userId, index) => (
            <View key={index} style={styles.pickerContainer}>
              <Picker
                style={styles.smallInput}
                selectedValue={userId}
                onValueChange={(itemValue) => {
                  const updatedUserIds = [...userIds];
                  updatedUserIds[index] = itemValue;
                  setUserIds(updatedUserIds);
                }}
              >
                <Picker.Item label={`Student ${index + 1}`} value={null} />
                {studentsData?.filter(user => user.type === 'student').map((user) => (
                  <Picker.Item key={user.userId} label={user.name} value={user.userId} />
                ))}
              </Picker>
              {index > 0 && (
                <Pressable onPress={() => {
                  const updatedUserIds = [...userIds];
                  updatedUserIds.splice(index, 1);
                  setUserIds(updatedUserIds);
                }} style={styles.removeButton}>
                  <Text style={styles.text}>Remove</Text>
                </Pressable>
              )}
            </View>
          ))}
          <Pressable onPress={() => setUserIds([...userIds, null])} style={styles.button2}>
            <Text style={styles.text}>Add More Students</Text>
          </Pressable>
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
  cardlayout: {
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 80,
    paddingBottom: 80,
    borderRadius: 20,
    textAlign: "center",
  },

  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor:"white",
  },
  smallInput: {
    flex: 0.8, // Adjust the flex value as needed
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#FF0000",
  },
  card2:{
backgroundColor: "#fff",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 80,
    paddingBottom: 80,
    borderRadius: 20,
    textAlign: "center",
  },
  cardtext: {
    color: "#3734A9",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#3734A9",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 21,
  },
  container2: {
    backgroundColor: "#ffff",
    paddingTop: 20,
    paddingBottom: 80,
    paddingLeft: 45,
    paddingRight: 45,
  },
  textstyles: {
    color: "white",
    fontFamily: "league",
    fontSize: 30,
    fontWeight: "500",
    paddingRight: 10,
  },
  logo: {
    width: 210,
    height: 210,
    marginLeft: 120,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginBottom:10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#E652FF",
  },
  input: {
    backgroundColor:'#fff',
    textAlign:'center',
    height: 50,
    width:270,
    margin: 12,
    borderWidth: 1,
    borderRadius:50,
    color:'black',
  },
  div: {
    backgroundColor: "#E652FF",
    paddingBottom: 65,
    paddingTop: 65,
    paddingLeft: 45,
    paddingRight: 45,
    borderRadius: 15,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#3734A9",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  space: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacetop: {
    paddingTop: 30,
  },
});
