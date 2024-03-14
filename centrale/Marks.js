import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

export default function Marks({ navigation }) {
  const [studentData, setStudentData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMarkData = async () => {
    try {
      const apiUrl = `https://centrale.onrender.com/projectStageMarks/${studentData?.userId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMarkData(data);
    } catch (error) {
      console.error('Error fetching mark data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMarkData();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await AsyncStorage.getItem("studentData");
        if (data) {
          const parsedData = JSON.parse(data);
          setStudentData(parsedData);
        }
      } catch (error) {
        console.error("Error fetching student data from AsyncStorage:", error);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (studentData) {
      fetchMarkData();
    }
  }, [studentData]);

  useEffect(() => {
    if (markData) {
      setLoading(false);
    }
  }, [markData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator animating={loading} color={'white'} size={'large'} />
          ) : markData && markData.success ? (
            markData.projectStageMarks.map((item, index) => (
              <><View key={index} style={styles.card3}>
                <Text style={styles.text}>{item.stageName}: {item.marks != null ? item.marks : 'N/A'}</Text>
              </View><View style={styles.spacetop}></View></>
            ))
          ) : (
            <Text style={styles.text}>No marks available</Text>
          )}
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    width:'100%',
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
