import React, { useEffect, useState } from "react";
import { Button, Pressable,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function UploadMarks({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [deleteResult, setDeleteResult] = useState(false);


  useEffect(()=>{
 // Replace the URL with your actual API endpoint
 const apiUrl = `http://192.168.1.4:8080/users`;
  
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

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.textstyles}>Choose To Add Mark</Text>
        <View style={styles.spacetop}></View>
        <Text style={styles.text}>Submit the marks for each phase</Text>
        <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addsynopsismark')}>
        <Text style={styles.text}>Synopsis</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('adddesignmark')}>
        <Text style={styles.text}>Design</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addfirstmark')}>
        <Text style={styles.text}>First Presentation</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addfiftymark')}>
        <Text style={styles.text}>Code 50%</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addsecondmark')}>
        <Text style={styles.text}>Second Presentation</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addhundredmark')}>
        <Text style={styles.text}>Code 100%</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addfinalmark')}>
        <Text style={styles.text}>Final Presentation</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable style={styles.button2} onPress={() => navigation.navigate('addreportmark')}>
        <Text style={styles.text}>Report</Text>
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
    paddingVertical: 25,
    paddingHorizontal: 42,
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
    fontSize: 18,
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
