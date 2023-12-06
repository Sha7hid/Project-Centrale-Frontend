import React, { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function ChooseTopic({ navigation }) {
  const [studentData,setStudentData] = useState(null)
  const [teamData,setTeamData] = useState(null)
  const [projectData,setProjectData] = useState(null)
  const [name,setName] = useState(null)
  const [success,setSuccess] = useState(false);
  const handleSubmit = () => {
   
    const apiUrl = `http://192.168.170.51:8080/project/name/update/teamid/${teamData.id}`;
  
    const requestData = {
       name:name
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
    const apiUrl = `http://192.168.170.51:8080/project/teamid/${teamId}`;
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
    const apiUrl = `http://192.168.170.51:8080/team/studentid/${studentId}`;
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

 
 
console.log(projectData)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.textstyles}>Enter Your Project Name</Text>
            <View style={styles.spacetop}></View>
            <Text style={styles.text}>You can also update existing project name</Text>
            <Text style={styles.text}>which is given below</Text>
            <View style={styles.spacetop}></View>
            <TextInput style={styles.input} onChangeText={text => setName(text)} placeholder="project name"/>
            <Pressable style={styles.button2} onPress={handleSubmit} >
                <Text style={styles.text}>Submit</Text>
            </Pressable>
            <View style={styles.spacetop}></View>
            {success?<Text style={styles.text}>Successfully Submitted Project Name🎊</Text>:<Text></Text>}
            <View style={styles.spacetop}></View>
            <View style={styles.card}>
              {projectData?.name?
          <Text style={styles.cardtext}>{projectData.name}</Text>:<Text style={styles.cardtext}>No Project Name</Text>  
          }
            </View>
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
  card2: {
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
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#E652FF",
  },
  buttonred: {
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
