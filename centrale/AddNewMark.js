import React, { useEffect, useState } from "react";
import { Alert, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

export default function AddNewMark({ navigation }) {
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [projectStages, setProjectStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudentData = async () => {
    try {
      const apiUrl = 'https://centrale.onrender.com/users';
      const response = await fetch(apiUrl);
      const data = await response.json();
      const students = data.filter(user => user.type === 'student');
      setStudentData(students);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchProjectStages = async (userId) => {
    try {
      const apiUrl = `https://centrale.onrender.com/project-stages/${userId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProjectStages(data);
    } catch (error) {
      console.error('Error fetching project stages:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStudentData();
    setStudentId('');
    setSelectedStage('');
    setRefreshing(false);
  };

  const handleSubmit = () => {
    if (!studentId || !selectedStage) {
      Alert.alert('Selection Needed', 'Please select a student and a project stage');
      return;
    }

    const checkExistingProjectStageMark = async () => {
      try {
        const apiUrl = `https://centrale.onrender.com/projectStageMarks/validation/${selectedStage}/${studentId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success === true) {
          Alert.alert('Validation Error', 'The project stage mark already exists for the selected student and project stage');
        } else {
          addProjectStageMark();
        }
      } catch (error) {
        console.error('Error checking project stage mark:', error);
        Alert.alert('Error', 'An error occurred while checking project stage mark');
      }
    };
if(selectedStage && studentId){
  checkExistingProjectStageMark();
}

  };

  const addProjectStageMark = async () => {
    try {
      const apiUrl = 'https://centrale.onrender.com/projectStageMarks';
      const requestBody = {
        projectStageId: selectedStage,
        userId: studentId
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log('Response:', data);
      Alert.alert('🎊', 'Successfully added project stage mark');
      onRefresh();
    } catch (error) {
      console.error('Error adding project stage mark:', error);
      Alert.alert('Error', 'An error occurred while adding project stage mark');
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleStudentChange = (userId) => {
    setStudentId(userId);
    fetchProjectStages(userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <Text style={styles.textstyles}>Enter Details Of Mark</Text>
          <View style={styles.spacetop}></View>
          <Text style={styles.text}>Select the Student</Text>
          <Picker
            style={styles.input}
            selectedValue={studentId}
            onValueChange={(itemValue, itemIndex) => handleStudentChange(itemValue)}
          >
            <Picker.Item label="Select a student" value="" />
            {studentData && studentData.map(student => (
              <Picker.Item key={student.userId} label={student.name} value={student.userId} />
            ))}
          </Picker>
          <Text style={styles.text}>Select the Project Stage</Text>
          <Picker
            style={styles.input}
            selectedValue={selectedStage}
            onValueChange={(itemValue, itemIndex) => setSelectedStage(itemValue)}
          >
            <Picker.Item label="Select a stage" value="" />
            {projectStages.map(stage => (
              <Picker.Item key={stage.projectStageId} label={stage.stageName} value={stage.projectStageId} />
            ))}
          </Picker>
          <View style={styles.spacetop}></View>
          <Pressable onPress={handleSubmit} style={styles.button2}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
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
