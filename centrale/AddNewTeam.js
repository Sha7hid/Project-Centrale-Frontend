import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AddNewTeam({navigation}) {
  const [TeamData, setTeamData] = useState(null);
  const [name, setName] = useState('');
  const [studentId1, setStudentId1] = useState('');
  const [studentId2, setStudentId2] = useState('');
  const [studentId3, setStudentId3] = useState('');
  const [success,setSuccess] = useState(false);
  const handleSubmit = () => {
   
    const apiUrl = 'http://192.168.170.51:8080/teams';
  
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
  
//   useEffect(() => {
//     // Fetch student data from AsyncStorage when the component mounts
//     AsyncStorage.getItem("studentData")
//       .then((data) => {
//         if (data) {
//           const parsedData = JSON.parse(data);
//           setStudentData(parsedData);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching student data from AsyncStorage:", error);
//       });
//   }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.textstyles}>Enter Details of the Team</Text>
        <View style={styles.spacetop}></View>
     <TextInput style={styles.input} onChangeText={text => setName(text)} placeholder="name"/>
     <TextInput style={styles.input} onChangeText={text => setStudentId1(text)} placeholder="studentId 1"/>
     <TextInput style={styles.input} onChangeText={text => setStudentId2(text)} placeholder="studentId 2"/>
     <TextInput style={styles.input} onChangeText={text => setStudentId3(text)} placeholder="studentId 3"/>
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
