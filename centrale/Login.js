import React, { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useCallback } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
const [animating,setAnimating] = useState(false);
  const [isLoaded] = useFonts({
    league: require("./assets/fonts/LeagueSpartan-Bold.ttf"),
    kanit: require("./assets/fonts/Kanit-SemiBold.ttf"),
  });
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return null;
  }
  const handleSubmit = () => {
    
    // Replace the URL with your actual API endpoint
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is empty or doesn't match the pattern
    if (!email || !emailPattern.test(email)) {
      Alert.alert('Validation Error','Invalid email format');
      return;
    }
    if (!password || password.length < 5 || password.length > 8) {
      Alert.alert('Validation Error', 'Password must be between 5 and 8 characters');
      return;
    }
    const apiUrl = `https://centrale.onrender.com/user/email/${email}`;
    setAnimating(true)
    fetch(apiUrl, {
      method: 'GET', // Assuming you want to fetch student data based on email
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json()).then(setAnimating(false))
      .then(studentData => {
         AsyncStorage.setItem('studentData', JSON.stringify(studentData));
        // Check if a student with the provided email exists
        if (studentData && studentData.password === password) {
          // Password matches, navigate to the "user" page
          navigation.navigate('user');
        } else {
          // Password doesn't match, you can show an error message or handle it as needed
        Alert.alert('Error Logging In','Invalid email or password');
        }
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
    <ActivityIndicator animating={animating} color={'white'} size={'large'}/>
    <Text style={styles.welcome}>WELCOME</Text>
    <View style={styles.space}></View>
    <View>
    <Text style={styles.text}>Project</Text>
    <Text style={styles.text}>Centrale</Text>
    </View>
    <View style={styles.space}></View>
        <TextInput
         style={styles.input}
         placeholder="Email"
         onChangeText={text => setEmail(text)}
       />
        <TextInput
         style={styles.password}
         placeholder="Enter your Password"
         onChangeText={text => setPassword(text)}
       />
    
       <View style={styles.space}></View>
         <Pressable style={styles.button}
            onPress={handleSubmit}
           >
             <Text style={styles.buttontext}>Log In</Text>
           </Pressable>
           {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
           <View style={styles.space}></View>
           <Text style={styles.buttontext}>Have an account? <Pressable 
            onPress={() => navigation.navigate('signup')}
           >
             <Text style={styles.buttontext}>Sign Up</Text>
           </Pressable></Text>
    </View>
   )
 }
 const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: "#3734A9",
       alignItems: "center",
       justifyContent: "center",
      
     },
     text:{
         fontSize:40,
         color:'#fff',
         fontFamily:'league',
         fontWeight:'bold'
     },
     welcome:{
         fontSize:20,
         color:'#fff',
         fontFamily:'kanit'
     },
     space:{
         padding:20
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
       password:{
         backgroundColor:'#fff',
         textAlign:'center',
         height: 50,
         width:270,
         margin: 12,
         borderWidth: 1,
         borderRadius:50
       },
       cpassword:{
         backgroundColor:'#fff',
         height: 40,
         margin: 12,
         borderWidth: 1,
         paddingLeft: 70,
         paddingRight:70,
         borderRadius:50
       },
       button:{
         alignItems: 'center',
         justifyContent: 'center',
         paddingVertical: 12,
         paddingHorizontal: 32,
         borderRadius: 5,
         elevation: 3,
         backgroundColor: "skyblue",
       },
       buttontext:{
         fontSize: 16,
         lineHeight: 21,
         fontWeight: 'bold',
         letterSpacing: 0.25,
         color: 'white',
       },
       errorText:{
        marginTop:8,
        fontSize:20,
        color:'#FF0000',
        fontWeight:'bold',
        fontFamily:'kanit'
       }
})
