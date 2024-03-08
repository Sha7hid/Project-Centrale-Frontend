import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function ChooseTeam({ navigation }) {
  const [teamsData, setTeamsData] = useState([]);
  const [studentData,setStudentData] = useState(null)
  const [teamId,setTeamId] = useState(null)
  const [success,setSuccess] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [animating,setAnimating] = useState(true);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
  
    try {
     await fetchTeamsData();
      setSuccess(false);
      setTeamId('');
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  }, []);
  const handleSubmit = () => {
    if (isNaN(teamId)) {
      Alert.alert('Validation Error','Team ID should be a number');
      return;
    }
    const apiUrl = `https://centrale.onrender.com/team/teacherId/update/id/${teamId}`;
  
    const requestData = {
       teacherId:studentData.id
    };
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(Alert.alert('🎊','Successfully Choosed Your Team'))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
     onRefresh()
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
  useEffect(() => {
    // Fetch team data from your API
    fetchTeamsData();
  }, []);
  const fetchTeamsData = async () => {
    // Replace the URL with your actual API endpoint
    const apiUrl = `https://centrale.onrender.com/teams`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Fetch student names for each team
      const teamsWithStudents = await Promise.all(
        data.map(async (team) => {
          const studentsWithNames = [];

          // Fetch student names for studentId1, studentId2, and studentId3
          for (let i = 1; i <= 3; i++) {
            const studentId = team[`studentId${i}`];
            const studentApiUrl = `https://centrale.onrender.com/user/id/${studentId}`;
            const studentResponse = await fetch(studentApiUrl);
            const studentData = await studentResponse.json();
            studentsWithNames.push({
              id: studentId,
              name: studentData.name,
            });
          }

          return {
            ...team,
            students: studentsWithNames,
          };
        })
      );

      setTeamsData(teamsWithStudents);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (teamsData) {
    setTimeout(() => {
        setAnimating(false);
      }, 8000); 
    }
  
  },[teamsData])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.container}>
            <Text style={styles.textstyles}>Enter your Team Id</Text>
            <TextInput style={styles.input} value={teamId} onChangeText={text => setTeamId(text)} placeholder="Team ID"/>
            <Pressable style={styles.button2} onPress={handleSubmit}>
                <Text style={styles.text}>Submit</Text>
            </Pressable>
            <View style={styles.spacetop}></View>
            <Text style={styles.text}>look through to see if you have already </Text>
            <Text style={styles.text}>choosed a team</Text>
            <ActivityIndicator animating={animating} color={'white'} size={'large'}/>
          {teamsData.map((team) => (
            <>
             <View style={styles.spacetop}></View>
              <View key={team.id} style={styles.card}>
                <Text>Team ID: {team.id}</Text>
                <View style={styles.spacetop}></View>
                <Text>Team Name: {team.name}</Text>
                {team.students.map((student, index) => (
                  <View key={student.id} style={styles.spacetop}>
                    <Text>
                      Student {index + 1} Name: {student.name}
                    </Text>
                  </View>
                ))}
                 <View style={styles.spacetop}></View>
                {team.teacherId===studentData.id?<Text>Teacher Name: {studentData.name}</Text>:<Text>TeacherID :{team.teacherId}</Text>}
              </View>
              <View style={styles.spacetop}></View>
            </>
          ))}
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 20,
    textAlign: "center",
    width:'85%'
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
