import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function UpdateTeam({navigation}) {

  const [teamId, setTeamId] = useState('');
  const [teamData,setTeamData] = useState(null)
  const [name, setName] = useState('');
  const [studentId1, setStudentId1] = useState('');
  const [studentId2, setStudentId2] = useState('');
  const [studentId3, setStudentId3] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [success,setSuccess] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTeamId('')
    setName('')
      setStudentId1('')
      setStudentId2('')
      setStudentId3('')
      setTeacherId('')
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    
  }, []);
  const handleSubmit = () => {
  
    const apiUrl = `https://centrale.onrender.com/team/update/id/${teamId}`;
  
    const requestData = {
        name:name,
        studentId1:studentId1,
        studentId2:studentId2,
        studentId3:studentId3,
        teacherId:teacherId
    };
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(Alert.alert('🎊','Successfully Updated Team'))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
     onRefresh()
  };
  
  useEffect(() => {
    if (teamId != null) {
      const apiUrl = `https://centrale.onrender.com/team/id/${teamId}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Set the state values here
          setTeamData(data);
          setName(data?.name);
          setStudentId1(data?.studentId1);
          setStudentId2(data?.studentId2);
          setStudentId3(data?.studentId3);
          setTeacherId(data?.teacherId);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [teamId]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
        <Text style={styles.textstyles}>Enter Details of the Team</Text>
        <View style={styles.spacetop}></View>
        <View style={styles.row}>
        <Text style={styles.text2}>Id     </Text>
        <TextInput style={styles.input} value={teamId} onChangeText={text => setTeamId(text)} placeholder="id"/>
        </View>
        <View style={styles.row}>
        <Text style={styles.text2}>Name</Text>
     <TextInput style={styles.input} value={name} onChangeText={text => setName(text)} placeholder="name"/>
     </View>
     <View style={styles.row}>
        <Text style={styles.text2}>StId1</Text>
     <TextInput style={styles.input} value={String(studentId1)} onChangeText={text => setStudentId1(text)} placeholder="studentId 1"/>
     </View>
     <View style={styles.row}>
        <Text style={styles.text2}>StId2</Text>
     <TextInput style={styles.input} value={String(studentId2)} onChangeText={text => setStudentId2(text)} placeholder="studentId 2"/>
     </View>
     <View style={styles.row}>
        <Text style={styles.text2}>StId3</Text>
     <TextInput style={styles.input} value={String(studentId3)} onChangeText={text => setStudentId3(text)} placeholder="studentId 3"/>
     </View>
     <View style={styles.row}>
        <Text style={styles.text2}>tId    </Text>
     <TextInput style={styles.input} value={String(teacherId)} onChangeText={text => setTeacherId(text)} placeholder="teacherId"/>
     </View>
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
  row:{
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
    marginBottom:10
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
  text2: {
    fontSize: 14,
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
