import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable,RefreshControl,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AdminTeam({navigation}) {
  const [teamsData, setTeamsData] = useState(null);
  const [studentNames, setStudentNames] = useState({
    studentId1: '',
    studentId2: '',
    studentId3: '',
    teacherId:'',
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [animating,setAnimating] = useState(true);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const apiUrl = `https://centrale.onrender.com/teams`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setTeamsData(data))
   .catch(error => {
     // Handle any errors that occur during the fetch
     console.error('Error:', error);
   });
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    
  }, []);
  const fetchStudentDetails = async (studentId) => {
    const apiUrl = `https://centrale.onrender.com/user/id/${studentId}`;
  
    try {
      const response = await fetch(apiUrl);
      const studentDetails = await response.json();
      return studentDetails.name;
    } catch (error) {
      console.error('Error fetching student details:', error);
      return null;
    }
  };


  useEffect(()=>{
 // Replace the URL with your actual API endpoint
 const apiUrl = `https://centrale.onrender.com/teams`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setTeamsData(data)).then( setTimeout(() => {
  setAnimating(false);
}, 2000))
   .catch(error => {
     // Handle any errors that occur during the fetch
     console.error('Error:', error);
   });

  },[]);
  useEffect(() => {
    const fetchData = async () => {
      const promises = teamsData.map(async (data) => {
        const names = {
          studentId1: '',
          studentId2: '',
          studentId3: '',
          teacherId:'',
        };

        if (data?.studentId1) {
          names.studentId1 = await fetchStudentDetails(data?.studentId1);
        }
        if (data?.studentId2) {
          names.studentId2 = await fetchStudentDetails(data?.studentId2);
        }
        if (data?.studentId3) {
          names.studentId3 = await fetchStudentDetails(data?.studentId3);
        }
        if (data?.teacherId) {
          names.teacherId = await fetchStudentDetails(data?.teacherId);
        }
        return names;
      });

      const studentNamesArray = await Promise.all(promises);
      setStudentNames(studentNamesArray);
    };

    fetchData();
  }, [teamsData]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container2}>
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
      <ActivityIndicator animating={animating} color={'white'} size={'large'}/>
{teamsData?.map((data,index) =>(
        <>
        <View key={data.id} style={styles.card}>
          <Text>Id: {data.id}</Text>
          <Text >Name: {data.name}</Text>
          <Text >ProjectID: {data.projectId}</Text>
          <Text >StudentID 1: {data.studentId1}</Text>
          <Text>StudentName: {studentNames[index]?.studentId1}</Text>
          <Text >StudentID 2: {data.studentId2}</Text>
          <Text>StudentName: {studentNames[index]?.studentId2}</Text>
          <Text >StudentID 3: {data.studentId3}</Text>
          <Text>StudentName: {studentNames[index]?.studentId3}</Text>
         {data.teacherId? <Text>TeacherID : {data.teacherId}</Text>:<Text></Text>}
         {data.teacherId? <Text>TeacherName : {studentNames[index]?.teacherId}</Text>:<Text></Text>}
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
    width:'90%'
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
    flex: 1,
    backgroundColor: "#3734A9",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 21,
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
