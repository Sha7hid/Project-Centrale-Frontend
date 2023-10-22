import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function Signup({ navigation }) {
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
  return (
   <View style={styles.container}>
   <Text style={styles.welcome}>WELCOME</Text>
   <View style={styles.space}></View>
   <View>
   <Text style={styles.text}>Project</Text>
   <Text style={styles.text}>Centrale</Text>
   </View>
   <View style={styles.space}></View>
   <TextInput
        style={styles.input}
        placeholder="Name"
      />
       <TextInput
        style={styles.input}
        placeholder="Email"
      />
       <TextInput
        style={styles.password}
        placeholder="Enter your Password"
      />
       <TextInput
        style={styles.cpassword}
        placeholder="Confirm password"
      />
      <View style={styles.space}></View>
        <Pressable style={styles.button}
            onPress={() => navigation.navigate('user')}
          >
            <Text style={styles.buttontext}>Sign Up</Text>
          </Pressable>
          <View style={styles.space}></View>
          <Text style={styles.buttontext}>Have an account? <Pressable 
           onPress={() => navigation.navigate('login')}
          >
            <Text style={styles.buttontext}>Log In</Text>
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
        padding:10
      },
      input: {
        backgroundColor:'#fff',
        textAlign:'center',
        height: 50,
        width:270,
        margin: 12,
        borderWidth: 1,
        borderRadius:50
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
        textAlign:'center',
         height: 50,
         width:270,
        margin: 12,
        borderWidth: 1,
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
      }
  });