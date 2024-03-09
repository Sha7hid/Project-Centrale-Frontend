import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function DeleteMark({navigation}) {
  const [userId, setUserId] = useState('');
  const [success,setSuccess] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setUserId('')
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    
  }, []);
  const showAlert = () =>{
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this mark?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress:handleDelete},
      ])
  }
  const handleDelete = async () => {
    if(!userId){
      Alert.alert('Field Needed','Please fill in the mark Id')
      return
    }
    const apiUrl = `https://centrale.onrender.com/mark/delete/${userId}`;

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(Alert.alert('🎊','Successfully Deleted Mark'))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
      onRefresh()
  };
  
//   useEffect(() => {
//     // Fetch student data from AsyncStorage when the component mounts
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
//   }, []);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
        <Text style={styles.textstyles}>Enter the ID of the Mark to delete</Text>
        <View style={styles.spacetop}></View>
     <TextInput style={styles.input} value={userId} onChangeText={text => setUserId(text)} placeholder="id"/>
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
