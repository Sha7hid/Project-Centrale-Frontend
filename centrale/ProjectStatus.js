import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ProjectStatus({ navigation }) {
  const [studentData, setStudentData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [userId, setUserId] = useState(null);
  const [approvalPercentage, setApprovalPercentage] = useState(0); // Initialize with 0%

  const handleUpdateApproval = async (stageId) => {
    try {
      const apiUrl = `https://centrale.onrender.com/project-stage/approval`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, stageId }),
      });
      if (response.ok) {
        Alert.alert('🎊', 'Successfully Approved');
        // Refresh data after approval
        fetchData(userId);
      } else {
        console.error('Failed to update Approval:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Approval:', error);
    }
  };

  const fetchData = (studentId) => {
    setAnimating(true);
    const apiUrl = `https://centrale.onrender.com/project-stages/${studentId}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setTeamData(data);
        calculateApprovalPercentage(data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setAnimating(false);
      });
  };

  const calculateApprovalPercentage = (data) => {
    if (!data || !data.length) return;
    const approvedStages = data.filter(stage => stage.approval).length;
    const percentage = (approvedStages / data.length) * 100;
    setApprovalPercentage(percentage);
  };

  useEffect(() => {
    if (studentData) {
      fetchData(studentData?.userId);
    }
    setUserId(studentData?.userId);
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

  const renderStages = () => {
    if (!teamData) return null;

    return teamData.map((stage, index) => (
   
      <View key={index} style={styles.cardlayout}>
        <Pressable style={styles.button2} onPress={() => handleStagePress(stage)}>
          <Text style={styles.text}>{stage.stageName}</Text>
        </Pressable>
        {studentData.type === 'teacher'? <><View style={styles.space}></View><Pressable onPress={() => handleUpdateApproval(stage.stageId)} style={styles.button2}>
          <Text style={styles.text}>{stage.approval ? 'Approved✅' : 'Approve'}</Text>
        </Pressable></>:<View></View>}
       
      </View>
    ));
  };

  const handleStagePress = (stage) => {
    if (stage.link) {
      Linking.openURL(stage.link);
    } else {
      Alert.alert('No Link Available', 'This stage does not have a link associated with it.');
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      fetchData(userId);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  }, [teamData?.id]);
console.log(teamData)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <Text style={styles.textstyles}>Project Status</Text>
          <View style={styles.spacetop}></View>
          <View style={styles.card2}>
            <Text style={styles.text2}>{approvalPercentage.toFixed(2)}%</Text>
          </View>
          <ActivityIndicator animating={animating} color={'white'} size={'large'} />
          <View style={styles.spacetop}></View>
          {renderStages()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  cardlayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:20
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
    paddingTop: 50,
    paddingBottom: 50,
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
  textstyles2: {
    color: "black",
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
  buttonwhite: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text2: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  textblue: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3734A9",
  },
  space: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacetop: {
    paddingTop: 30,
  },
});
