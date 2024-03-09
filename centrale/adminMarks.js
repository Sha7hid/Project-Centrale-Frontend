import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable,RefreshControl,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AdminMarks({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [deleteResult, setDeleteResult] = useState(false);
  const [studentsDetails, setStudentsDetails] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [animating,setAnimating] = useState(true);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const apiUrl = `https://centrale.onrender.com/marks`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setStudentsData(data))
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
      return studentDetails;
    } catch (error) {
      console.error('Error fetching student details:', error);
      return null;
    }
  };
  useEffect(()=>{
 // Replace the URL with your actual API endpoint
 const apiUrl = `https://centrale.onrender.com/marks`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setStudentsData(data)).then(  setTimeout(() => {
 setAnimating(false);
}, 2000))
   .catch(error => {
     // Handle any errors that occur during the fetch
     console.error('Error:', error);
   });

  },[]);
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
  useEffect(() => {
    const fetchData = async () => {
      const detailsPromises = studentsData.map(data => fetchStudentDetails(data.studentid));
      const details = await Promise.all(detailsPromises);
      setStudentsDetails(details);
    };

    fetchData();
  }, [studentsData]);
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('addnewmark')} style={styles.button2}>
        <Text style={styles.text}>Add New Mark</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable onPress={() => navigation.navigate('deletemark')} style={styles.button2}>
        <Text style={styles.text}>Delete Mark</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      {/* <Pressable  style={styles.button2}>
        <Text style={styles.text}>Update A Mark</Text>
      </Pressable>
      <View style={styles.spacetop}></View> */}
      <Text style={styles.text}>Look through to select the mark id</Text>
      <View style={styles.spacetop}></View>
      <ActivityIndicator animating={animating} color={'white'} size={'large'}/>
{studentsData?.map((data,index) =>(
        <>
        <View key={data.id} style={styles.card}>
  <Text>Id: {data.id}</Text>
  <Text>StudentName: {studentsDetails[index] ? studentsDetails[index].name : 'N/A'}</Text>
  <Text>Synopsis: {data.synopsis? data.synopsis : 0}</Text>
  <Text>Design: {data.design? data.design : 0}</Text>
  <Text>First Presentation: {data.first_presentation? data.first_presentation : 0}</Text>
  <Text>50% Coding: {data.fifty_percent_coding? data.fifty_percent_coding : 0}</Text>
  <Text>Second Presentation: {data.second_presentation? data.second_presentation : 0}</Text>
  <Text>100% Coding: {data.hundred_percent_coding? data.hundred_percent_coding : 0}</Text>
  <Text>Final Presentation: {data.final_presentation? data.final_presentation : 0}</Text>
  <Text>Report: {data.report? data.report : 0}</Text>
  <Text>Attendance: {data.attendance? data.attendance : 0}</Text>
          <View style={styles.spacetop}></View>
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
