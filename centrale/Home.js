import { StatusBar } from "expo-status-bar";
import * as React from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function Home({ navigation }) {
    const [isLoaded] = useFonts({
      league: require("./assets/fonts/LeagueSpartan-SemiBold.ttf"),
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
      <>
        <View style={styles.container} onLayout={handleOnLayout}>
          <Image style={styles.logo} source={require("./assets/project.png")} />
          <View style={styles.div}>
            <Text style={styles.textstyles}>Project Centrale</Text>
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={styles.container2}>
          <Pressable style={styles.button}
           onPress={() => navigation.navigate('login')}
          >
            <Text style={styles.text}>Log In</Text>
          </Pressable>
          <View style={styles.space}></View>
          <Pressable style={styles.button}
          onPress={() => navigation.navigate('signup')}
          >
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
          <View style={styles.space}></View>
        </View>
      </>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#3734A9",
      alignItems: "center",
      justifyContent: "center",
     
    },
    container2:{
      backgroundColor: "#ffff",
      paddingTop:20,
      paddingBottom:80,
      paddingLeft:45,
      paddingRight:45
    },
    textstyles: {
      color: "white",
      fontFamily: "league",
      fontSize: 50,
    },
    logo: {
      width: 210,
      height: 210,
      marginLeft:120,
    
    },
    div: {
      backgroundColor: "#E652FF",
      paddingBottom: 65,
      paddingTop: 65,
      paddingLeft: 45,
      paddingRight: 45,
      borderRadius: 15,
      marginBottom:20
    },
    button:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 50,
      elevation: 3,
      backgroundColor: "#3734A9",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    space:{
      padding:10
    }
  });