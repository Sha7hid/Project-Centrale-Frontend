import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View ,Linking} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AddCodephase2({navigation}) {
    const [studentData,setStudentData] = useState(null)
    const [teamData,setTeamData] = useState(null)
    const [projectData,setProjectData] = useState(null)
    const [link,setLink] = useState(null)
    const [success,setSuccess] = useState(false);
    const handleSubmit = () => {
     
      const apiUrl = `http://192.168.1.5:8080/project/codephase2/update/teamid/${teamData.id}`;
    
      const requestData = {
         codephase2:link
      };
    
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(setSuccess(true))
        .catch(error => {
          // Handle any errors that occur during the fetch
          console.error('Error:', error);
        });
       
    };
    const fetchProjectData = (teamId) => {
      const apiUrl = `http://192.168.1.5:8080/project/teamid/${teamId}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setProjectData(data))
        .catch(error => {
          console.error('Error:', error);
        });
    };
    
    useEffect(() => {
      if (teamData) {
        fetchProjectData(teamData.id);
      }
    }, [teamData]);
    const fetchData = (studentId) => {
      const apiUrl = `http://192.168.1.5:8080/team/studentid/${studentId}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setTeamData(data))
        .catch(error => {
          console.error('Error:', error);
        });
    };
    
    useEffect(() => {
      if (studentData) {
        fetchData(studentData.id);
      }
    }, [studentData]);
  console.log(projectData)
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
        <Text style={styles.textstyles}>Add Url Of 100% Coding</Text>
        <View style={styles.spacetop}></View>
        <Text style={styles.text}>You can also update existing 100% code url</Text>
        <View style={styles.spacetop}></View>
        <Text style={styles.text}>check the file by clicking on the link</Text>
        <View style={styles.spacetop}></View>
     <TextInput style={styles.input} onChangeText={text => setLink(text)} placeholder="google drive link"/>
     <View style={styles.spacetop}></View>
     <Pressable onPress={handleSubmit} style={styles.button2}>
        <Text style={styles.text}>Submit</Text>
     </Pressable>
     <View style={styles.spacetop}></View>
     {success?<Text style={styles.text}>Successfully Added 100% Coding 🎊</Text>:<Text></Text>}
     <View style={styles.spacetop}></View>
            <View style={styles.card}>
              {projectData?.codephase2?
              <Pressable onPress={()=> {
                Linking.openURL(projectData.codephase2)
              }}>
<Text style={styles.cardtext}>{projectData.codephase2}</Text>
              </Pressable>
          :<Text style={styles.cardtext}>No 100% Coding</Text>  
          }
            </View>
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
  space: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacetop: {
    paddingTop: 30,
  },
});
