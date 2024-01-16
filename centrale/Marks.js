import React, { useEffect, useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function Marks({ navigation }) {
  const [studentData, setStudentData] = useState(null);
  const [MarkData, setMarkData] = useState(null);
  const [deleteResult, setDeleteResult] = useState(false);


  useEffect(() => {
    // Replace the URL with your actual API endpoint
    if (studentData != null) {
      const apiUrl = `https://centrale.onrender.com/mark/studentid/${studentData?.id}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setMarkData(data))
        .catch(error => {
          // Handle any errors that occur during the fetch
          console.error('Error:', error);
        });
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
  console.log(MarkData)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {MarkData ? <>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>Synopsis: {MarkData?.synopsis ? MarkData?.synopsis : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>Design: {MarkData?.design ? MarkData?.design : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>First Presentation: {MarkData?.first_presentation ? MarkData?.first_presentation : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>50% Coding: {MarkData?.fifty_percent_coding ? MarkData?.fifty_percent_coding : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>Second Presentation: {MarkData?.second_presentation ? MarkData?.second_presentation : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>100% Coding: {MarkData?.hundred_percent_coding ? MarkData?.hundred_percent_coding : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>Final Presentation: {MarkData?.final_presentation ? MarkData?.final_presentation : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>Report: {MarkData?.report ? MarkData?.report : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
            <View key={MarkData?.id} style={styles.card3}>
              <Text style={styles.text}>Attendance: {MarkData?.attendance ? MarkData?.attendance : 0}</Text>
            </View>
            <View style={styles.spacetop}></View>
          </> : <View></View>}


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
  card3:{
    backgroundColor: "#E652FF",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 30,
    paddingBottom: 30,
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
