import React, { useEffect, useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AddNewMark({navigation}) {
  const [markData, setMarkData] = useState(null);
  const[studentData, setStudentData] = useState(null);
  const [studentid, setStudentid] = useState('');
  const [success,setSuccess] = useState(false);
  const handleSubmit = () => {
   
    const apiUrl = 'http://192.168.1.5:8080/marks';
  
    const requestData = {
       studentid:studentid
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(markData => setMarkData(markData))
      .then(setSuccess(true))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
      console.log(studentData)
  };
  useEffect(()=>{
    // Replace the URL with your actual API endpoint
    const apiUrl = `http://192.168.1.5:8080/users`;
     
    fetch(apiUrl)
      .then(response => response.json())
   .then(data => setStudentData(data))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
   
     },[]);
  // useEffect(() => {
  //   // Fetch student data from AsyncStorage when the component mounts
  //   AsyncStorage.getItem("studentData")
  //     .then((data) => {
  //       if (data) {
  //         const parsedData = JSON.parse(data);
  //         setStudentData(parsedData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching student data from AsyncStorage:", error);
  //     });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.textstyles}>Enter The Student Id To Add Mark</Text>
        <View style={styles.spacetop}></View>
     <TextInput style={styles.input} onChangeText={text => setStudentid(text)} placeholder="student id"/>
     <View style={styles.spacetop}></View>
     <Pressable onPress={handleSubmit} style={styles.button2}>
        <Text style={styles.text}>Submit</Text>
     </Pressable>
     <View style={styles.spacetop}></View>
     {success?<Text style={styles.text}>Successfully Added Mark For Student 🎊</Text>:<Text></Text>}
     <View style={styles.spacetop}></View>
<Text style={styles.text}>Look through to select the student id</Text>
     {studentData?.map((data) =>(
        <>
         {data.type == 'student'?
        <View key={data.id} style={styles.card}>
  <Text>Id: {data.id}</Text>
  <Text>Name: {data.name}</Text>
          <View style={styles.spacetop}></View>
        </View>
         :<View></View>}
        <View style={styles.spacetop}></View>
        </>
      ))}
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
