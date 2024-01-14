import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import {Picker} from '@react-native-picker/picker';
export default function AddNewTeam({navigation}) {
  const [TeamData, setTeamData] = useState(null);
  const [name, setName] = useState('');
  const [studentsData,setStudentsData] = useState(null)
  const [studentId1, setStudentId1] = useState('');
  const [studentId2, setStudentId2] = useState('');
  const [studentId3, setStudentId3] = useState('');
  const [success,setSuccess] = useState(false);
  const handleSubmit = () => {
   
    const apiUrl = 'https://centrale.onrender.com/teams';
  
    const requestData = {
        name:name,
      studentId1: studentId1,
      studentId2: studentId2,
      studentId3:studentId3
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
      .then(setSuccess(true))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
      console.log(TeamData)
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
     const filteredData = studentsData?.filter((data) => {
      return (
        data.type === 'student'
      );
    });
    console.log(studentId1)
    console.log(studentId2)
    console.log(studentId3)
  return (
    <View style={styles.container}>
        <Text style={styles.textstyles}>Enter Details of the Team</Text>
        <View style={styles.spacetop}></View>
     <TextInput style={styles.input} onChangeText={text => setName(text)} placeholder="name"/>
     <Picker
        style={styles.input}
        selectedValue={studentId1}
        onValueChange={(itemValue, itemIndex) => setStudentId1(itemValue)}
      >
        <Picker.Item label="Select student 1" value={null} />
        {filteredData?.map((student) => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={studentId2}
        onValueChange={(itemValue, itemIndex) => setStudentId2(itemValue)}
      >
        <Picker.Item label="Select student 2" value={null} />
        {filteredData?.map((student) => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={studentId3}
        onValueChange={(itemValue, itemIndex) => setStudentId3(itemValue)}
      >
        <Picker.Item label="Select student 3" value={null} />
        {filteredData?.map((student) => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
      </Picker>
     <View style={styles.spacetop}></View>
     <Pressable onPress={handleSubmit} style={styles.button2}>
        <Text style={styles.text}>Submit</Text>
     </Pressable>
     <View style={styles.spacetop}></View>
     {success?<Text style={styles.text}>Successfully Added Team 🎊</Text>:<Text></Text>}
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
    color:'grey'
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
