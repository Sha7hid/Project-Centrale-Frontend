import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import {Picker} from '@react-native-picker/picker';
export default function TeacherDeleteUser({navigation}) {
    const [studentsData,setStudentsData] = useState(null)
    const [studentData,setStudentData] = useState(null)
    const [TeamData,setTeamData] = useState(null)
  const [userId, setUserId] = useState('');
  const [success,setSuccess] = useState(false);
  const showAlert = () =>{
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this student?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress:handleDelete},
      ])
  }
  const handleDelete = async () => {
    const apiUrl = `https://centrale.onrender.com/user/delete/${userId}`;

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(Alert.alert('🎊','Successfully Deleted Student'))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };
  
  useEffect(()=>{
    // Replace the URL with your actual API endpoint
    const apiUrl = `https://centrale.onrender.com/users`;
     
    fetch(apiUrl)
      .then(response => response.json())
   .then(data => setStudentsData(data))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
   
     },[]);


     const fetchData = (studentId) => {
      const apiUrl = `https://centrale.onrender.com/team/studentid/${studentId}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setTeamData(data))
        .catch(error => {
          console.error('Error:', error);
        });
    };
    
    useEffect(() => {
      if (studentData) {
        fetchData(studentData.id);
      }
    }, [studentData]);
useEffect(() => {
// Fetch student data from AsyncStorage when the component mounts
AsyncStorage.getItem("studentData")
  .then((data) => {
    if (data) {
      const parsedData = JSON.parse(data);
      setStudentData(parsedData);
    }
  })
  .catch((error) => {
    console.error("Error fetching student data from AsyncStorage:", error);
  });
}, []);
const filteredData = studentsData?.filter((data) => {
return (
  data.type === 'student' &&
  (data.id === TeamData?.studentId1 || data.id === TeamData?.studentId2 || data.id === TeamData?.studentId3)
);
});

  return (
    <View style={styles.container}>
        <Text style={styles.textstyles}>Select the Student to delete</Text>
        <View style={styles.spacetop}></View>
     <Picker
        style={styles.input}
        selectedValue={userId}
        onValueChange={(itemValue, itemIndex) => setUserId(itemValue)}
      >
        <Picker.Item label="Select a student" value={null} />
        {filteredData?.map((student) => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
      </Picker>
     <View style={styles.spacetop}></View>
     <Pressable onPress={showAlert} style={styles.button2}>
        <Text style={styles.text}>Submit</Text>
     </Pressable>
     <View style={styles.spacetop}></View>
    </View>
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
