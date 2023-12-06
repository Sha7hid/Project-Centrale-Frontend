import React, { useEffect, useState } from "react";
import { Button, Pressable,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AdminTeam({navigation}) {
  const [teamsData, setTeamsData] = useState(null);



  useEffect(()=>{
 // Replace the URL with your actual API endpoint
 const apiUrl = `http://192.168.170.51:8080/teams`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setTeamsData(data))
   .catch(error => {
     // Handle any errors that occur during the fetch
     console.error('Error:', error);
   });

  },[]);
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
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('addnewteam')} style={styles.button2}>
        <Text style={styles.text}>Add New Team</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable onPress={() => navigation.navigate('deleteteam')} style={styles.button2}>
        <Text style={styles.text}>Delete Team</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable onPress={() => navigation.navigate('updateteam')} style={styles.button2}>
        <Text style={styles.text}>Update A Team</Text>
      </Pressable>
      <View style={styles.spacetop}></View>

{teamsData?.map((data) =>(
        <>
        <View key={data.id} style={styles.card}>
          <Text>Id: {data.id}</Text>
          <Text >Name: {data.name}</Text>
          <Text >ProjectID: {data.projectId}</Text>
          <Text >StudentID 1: {data.studentId1}</Text>
          <Text >StudentID 2: {data.studentId2}</Text>
          <Text >StudentID 3:{data.studentId3}</Text>
         {data.teacherId? <Text>TeacherID : {data.teacherId}</Text>:<Text></Text>}
         
        </View>
        <View style={styles.spacetop}></View>
        </>
      ))}

     
      {/* Render your component with studentData */}
   
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
    fontSize: 40,
    fontWeight: "500",
    paddingRight: 140,
  },
  logo: {
    width: 210,
    height: 210,
    marginLeft: 120,
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
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#E652FF",
  },
  buttonred:{
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#FF0000",
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
