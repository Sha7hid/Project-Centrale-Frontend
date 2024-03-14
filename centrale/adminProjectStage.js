import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable,RefreshControl,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AdminProjectStage({navigation}) {
  const [deptData, setdeptData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [animating,setAnimating] = useState(true);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const apiUrl = `https://centrale.onrender.com/projectStages`;
  
    fetch(apiUrl)
      .then(response => response.json())
   .then(data => setdeptData(data))
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
 const apiUrl = `https://centrale.onrender.com/projectStages`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setdeptData(data)).then(    setTimeout(() => {
  setAnimating(false);
}, 2000))
   .catch(error => {
     // Handle any errors that occur during the fetch
     console.error('Error:', error);
   });

  },[]);


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('addnewprojectstage')} style={styles.button}>
        <Text style={styles.text}>Add New Project Stage</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      <Pressable onPress={() => navigation.navigate('deleteprojectstage')}  style={styles.button2}>
        <Text style={styles.text}>Delete Project Stage</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      {/* <Pressable  style={styles.button2}>
        <Text style={styles.text}>Update A Project</Text>
      </Pressable>
      <View style={styles.spacetop}></View> */}
      <ActivityIndicator animating={animating} color={'white'} size={'large'}/>
{deptData?.map((data,index) =>(
        <>
        <View key={data.projectStageId} style={styles.card}>
          <Text>Id: {data.projectStageId}</Text>
          <Text>Project Name: {data.projectName}</Text>
          <Text>Stage Name: {data.stageName}</Text>
        </View>
        <View style={styles.spacetop}></View>
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
    paddingRight: 50,
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
    paddingHorizontal: 25,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#E652FF",
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
