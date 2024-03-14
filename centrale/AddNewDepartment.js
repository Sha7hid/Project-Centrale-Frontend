import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import CryptoJS from 'crypto-js';
export default function AddNewDepartment({navigation}) {

  const [departmentName, setDepartmentName] = useState('');
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setDepartmentName('');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);




  const handleSubmit = () => {
    if (!departmentName) {
      Alert.alert('Field needed', 'Department Name should be entered');
      return;
    }
  
    // Fetch existing department names from the API
    const apiUrl = 'https://centrale.onrender.com/departments';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const existingDepartmentNames = data.map(department => department.departmentName);
        if (existingDepartmentNames.includes(departmentName)) {
          Alert.alert('Duplicate Department Name', 'Department name already exists. Please choose a different name.');
        } else {
          // If departmentName does not exist, proceed with submitting the form
          submitForm();
        }
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching department names:', error);
        setError(true);
      });
      onRefresh()
  };
  
  const submitForm = () => {
    const apiUrl = 'https://centrale.onrender.com/departments';
    const requestData = {
      departmentName: departmentName
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(() => {
        setSuccess(true);
        Alert.alert('🎊', 'Successfully Added Department');
        onRefresh();
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
        setError(true);
      });
  };
  

//   useEffect(() => {
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
//     fetchDepartments(); // Fetch departments when the component mounts
//   }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.textstyles}>Enter Details of the Department</Text>
          <View style={styles.spacetop}></View>
          <TextInput style={styles.input} value={departmentName} onChangeText={text => setDepartmentName(text)} placeholder="Department Name" />
          <View style={styles.spacetop}></View>
          <Pressable onPress={handleSubmit} style={styles.button2}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
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
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#E652FF",
    marginBottom:10,
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
  input2:{
    backgroundColor:'#fff',
    textAlign:'center',
    height: 50,
    width:250,
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
  error:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
  },
  space: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacetop: {
    paddingTop: 30,
  },
});
