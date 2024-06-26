import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import CryptoJS from 'crypto-js';
export default function AddNewUser({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setName('');
    setType('');
    setEmail('');
    setPassword('');
    setDepartmentId('');
    fetchDepartments();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const handleSubmit = () => {
    if (!isValidEmail) {
      Alert.alert('Validation Error','Invalid email address');
      return;
    }
    if (!password || password.length < 5 || password.length > 8) {
      Alert.alert('Validation Error', 'Password must be between 5 and 8 characters');
      return;
    }
    if (!type) {
      Alert.alert('Selection needed','Type should be selected');
      return;
    }
    if (!departmentId) {
      Alert.alert('Selection needed','Department should be selected');
      return;
    }
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    // Check if the email already exists
    const checkUrl = `https://centrale.onrender.com/user/email/${email}`;

    fetch(checkUrl)
      .then(response => response.json())
      .then(existingUser => {
        if (existingUser.email == email) {
          console.log('User with this email already exists:', existingUser);
          Alert.alert('User Exists','User with this email already exists');
        } else {
          const apiUrl = 'https://centrale.onrender.com/users';
          const requestData = {
            name: name,
            email: email,
            password: hashedPassword,
            type: type,
            deptId: departmentId // Assuming your API accepts departmentId for new users
          };
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          })
          .then(response => response.json())
          .then(newStudentData => {
            setStudentData(newStudentData);
            Alert.alert('🎊','Successfully Added User');
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
      })
      .catch(error => {
        console.error('Error checking user existence:', error);
      });
    onRefresh();
  };

  const fetchDepartments = () => {
    fetch('https://centrale.onrender.com/departments')
      .then(response => response.json())
      .then(departmentsData => {
        setDepartments(departmentsData);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  };

  useEffect(() => {
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
    fetchDepartments(); // Fetch departments when the component mounts
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.textstyles}>Enter Details of the User</Text>
          <View style={styles.spacetop}></View>
          <TextInput style={styles.input} value={name} onChangeText={text => setName(text)} placeholder="Name" />
          <TextInput style={styles.input} value={email} onChangeText={handleEmailChange} placeholder="Email" />
          <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} placeholder="Password" />
          <Picker
            style={styles.input2}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          >
            <Picker.Item label="Select a type" value={null} />
            <Picker.Item key='student' label='student' value='student' />
            <Picker.Item key='teacher' label='teacher' value='teacher' />
            <Picker.Item key='admin' label='admin' value='admin' />
          </Picker>
          <Picker
            style={styles.input2}
            selectedValue={departmentId}
            onValueChange={(itemValue, itemIndex) => setDepartmentId(itemValue)}
          >
            <Picker.Item label="Select a department" value={null} />
            {departments.map((department) => (
              <Picker.Item key={department.departmentId} label={department.departmentName} value={department.departmentId} />
            ))}
          </Picker>
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
