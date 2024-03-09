import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import {Picker} from '@react-native-picker/picker';
export default function AddNewProject({navigation}) {
  const [ProjectData, setProjectData] = useState(null);
  const [teamsData, setTeamsData] = useState(null);
  const [teamID, setTeamID] = useState('');
  const [success,setSuccess] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
      setTeamID('')
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    
  }, []);
  const showAlert = () =>{
    Alert.alert('Confirm Project', 'Are you sure you want to add project to this team?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress:handleSubmit},
      ])
  }
  const handleSubmit = () => {
   if(!teamID){
    Alert.alert('Selection Needed','Please select a team')
    return
   }
    const apiUrl = 'https://centrale.onrender.com/projects';
  
    const requestData = {
   teamId:teamID
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(ProjectData => setProjectData(ProjectData))
      .then(Alert.alert('🎊','Successfully Added TeamID to Project'))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
      console.log(ProjectData)
      onRefresh()
  };
  
  useEffect(()=>{
    // Replace the URL with your actual API endpoint
    const apiUrl = `https://centrale.onrender.com/teams`;
     
    fetch(apiUrl)
      .then(response => response.json())
   .then(data => setTeamsData(data))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
   
     },[]);
console.log(teamID)
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
        <Text style={styles.textstyles}>Select Team of the Project</Text>
        <View style={styles.spacetop}></View>
        <Picker
        style={styles.input}
        selectedValue={teamID}
        onValueChange={(itemValue, itemIndex) => setTeamID(itemValue)}
      >
        <Picker.Item label="Select a team" value={null} />
        {teamsData?.map((student) => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
      </Picker>
     <View style={styles.spacetop}></View>
     <Pressable onPress={showAlert} style={styles.button2}>
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
