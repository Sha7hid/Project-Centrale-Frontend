import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AddNewUser({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };
  const handleSubmit = () => {
    // Check if the email already exists
    const checkUrl = `https://centrale.onrender.com/user/email/${email}`;
  
    fetch(checkUrl)
      .then(response => response.json())
      .then(existingUser => {
        console.log(existingUser)
        if ( existingUser.email == email) {
          // User with the same email already exists, handle accordingly
          console.log('User with this email already exists:', existingUser);
          setError(true)
          // You might want to show an error message or take other actions
        } else {
          // User does not exist, proceed with creating a new user
          const apiUrl = 'https://centrale.onrender.com/users';
  
          const requestData = {
            name: name,
            email: email,
            password: password,
            type: type
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
              setSuccess(true);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error checking user existence:', error);
      });
  };
  
  
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
    <View style={styles.container}>
        <Text style={styles.textstyles}>Enter Details of the User</Text>
        <View style={styles.spacetop}></View>
     <TextInput style={styles.input} onChangeText={text => setName(text)} placeholder="name"/>
     <TextInput style={styles.input}  onChangeText={handleEmailChange} placeholder="email"/>
     {!isValidEmail && <Text style={styles.error}>Invalid email address</Text>}
     <TextInput style={styles.input} onChangeText={text => setPassword(text)} placeholder="password"/>
     <TextInput style={styles.input} onChangeText={text => setType(text)} placeholder="type"/>
     <View style={styles.spacetop}></View>
     <Pressable onPress={handleSubmit} style={styles.button2}>
        <Text style={styles.text}>Submit</Text>
     </Pressable>
     <View style={styles.spacetop}></View>
     {success?<Text style={styles.text}>Successfully Added User 🎊</Text>:<Text></Text>}
     {error?<Text style={styles.text}>User Already Exists ⚠️</Text>:<Text></Text>}
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
