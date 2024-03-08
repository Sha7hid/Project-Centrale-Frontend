import React, { useEffect, useState } from "react";
import { Button, Pressable,RefreshControl,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function TeacherUsers({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [deleteResult, setDeleteResult] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const apiUrl = `https://centrale.onrender.com/users`;
  
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
console.log(studentData)
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('teacheraddnewuser')} style={styles.button2}>
        <Text style={styles.text}>Add New Student</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable onPress={() => navigation.navigate('teacherdeleteuser')} style={styles.button2}>
        <Text style={styles.text}>Delete Student</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable onPress={() => navigation.navigate('updateuser')} style={styles.button2}>
        <Text style={styles.text}>Update A Student</Text>
      </Pressable>
      <View style={styles.spacetop}></View>

{studentsData?.map((data) =>(
        <>{ data.type === 'student' ?
            <><View key={data.id} style={styles.card}>
            <Text>Id: {data.id}</Text>
            <Text>Name: {data.name}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Password: {data.password}</Text>
            <Text>Type:{data.type}</Text>
            <View style={styles.spacetop}></View>
        </View><View style={styles.spacetop}></View></>   :
        <View></View>
        }

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
    paddingRight: 30,
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
