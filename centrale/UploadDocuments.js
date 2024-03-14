import React, { useEffect, useState } from "react";
import { Button, Pressable,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function UploadDocuments({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [deleteResult, setDeleteResult] = useState(false);
  const [stageData, setStageData] = useState([]);

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
    // Fetch stage data associated with the user ID
    const userId = studentData?.userId; // Replace 'your_user_id_here' with the actual user ID
    fetchStageData(userId);
  }, [studentData]);

  const fetchStageData = async (userId) => {
    try {
      const apiUrl = `https://centrale.onrender.com/project-stages/${userId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setStageData(data);
    } catch (error) {
      console.error('Error fetching stage data:', error);
    }
  };

  const handleStagePress = (stageId) => {
    navigation.navigate('StageDetails', { stageId });
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.textstyles}>Choose To Upload</Text>
        <View style={styles.spacetop}></View>
        <Text style={styles.text}>Submit your google drive urls of the files</Text>
        <View style={styles.spacetop}></View>
      {stageData.map((stage, index) => (
        <Pressable key={index} style={styles.button2} onPress={() => handleStagePress(stage.stageId)}>
          <Text style={styles.text}>{stage.stageName}</Text>
        </Pressable>
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
  cardlayoutadmin: {
    marginTop: 45,
    flexDirection: "col",
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
    textAlign: "center"
  },
  cardadmin: {
    backgroundColor: "#fff",
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
    textAlign: "center",
  },
  cardadmin2: {
    backgroundColor: "#fff",
    paddingLeft: 50,
    paddingRight:50,
    paddingTop: 15,
    paddingBottom: 15,
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
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#E652FF",
    marginBottom:10
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