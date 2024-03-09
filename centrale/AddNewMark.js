import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import {Picker} from '@react-native-picker/picker';
export default function AddNewMark({navigation}) {
  const [markData, setMarkData] = useState(null);
  const[studentData, setStudentData] = useState(null);
  const [studentid, setStudentid] = useState('');
  const [success,setSuccess] = useState(false);
  const showAlert = () =>{
    Alert.alert('Confirm Student', 'Are you sure you want to add mark to this student?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress:handleSubmit},
      ])
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
      setStudentid('')
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    
  }, []);
  const handleSubmit = () => {
   if(!studentid){
    Alert.alert('Selection Needed','Please select a student');
    return
   }
    const apiUrl = 'https://centrale.onrender.com/marks';
  
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
      .then(Alert.alert('🎊','Successfully Added Mark For Student'))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
      console.log(studentData)
      onRefresh()
  };
  useEffect(()=>{
    // Replace the URL with your actual API endpoint
    const apiUrl = `https://centrale.onrender.com/users`;
     
    fetch(apiUrl)
      .then(response => response.json())
   .then(data => setStudentData(data))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
   
     },[]);
     const filteredData = studentData?.filter((data) => {
      return (
        data.type === 'student'
      );
    });
    console.log(studentid)
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
    <ScrollView
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
        <View style={styles.container}>
        <Text style={styles.textstyles}>Select The Student To Add Mark</Text>
        <View style={styles.spacetop}></View>
        <Picker
        style={styles.input}
        selectedValue={studentid}
        onValueChange={(itemValue, itemIndex) => setStudentid(itemValue)}
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
