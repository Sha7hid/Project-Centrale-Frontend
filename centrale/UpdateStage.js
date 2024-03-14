import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, Linking, RefreshControl } from "react-native";

export default function StageDetails({ route }) {
  const { stageId } = route.params;
  const [stageDetails, setStageDetails] = useState(null);
  const [linkDetails, setLinkDetails] = useState(null);
  const [link, setLink] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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
    // Fetch stage details based on the received stage ID
    if (studentData) {
      setUserId(studentData.userId);
      fetchStageDetails();
      fetchLinkDetails(studentData.userId);
    }
  }, [stageId, studentData]);

  const fetchStageDetails = async () => {
    try {
      const apiUrl = `https://centrale.onrender.com/stages/${stageId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setStageDetails(data[0]);
    } catch (error) {
      console.error('Error fetching stage details:', error);
    }
  };

  const fetchLinkDetails = async (userId) => {
    try {
      const apiUrl = `https://centrale.onrender.com/project-stages/${userId}/${stageId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLinkDetails(data);
    } catch (error) {
      console.error('Error fetching link details:', error);
    }
  };

  const handleUpdateLink = async () => {
    try {
      const apiUrl = `https://centrale.onrender.com/project-stages/update-link`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link, userId: userId, stageId }),
      });
      if (response.ok) {
        Alert.alert('🎊', 'Successfully Added Link');
        // Update successful, fetch updated link details
        fetchLinkDetails(userId);
        setLink('');
      } else {
        console.error('Failed to update link:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStageDetails();
    await fetchLinkDetails(userId);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {stageDetails && (
        <View>
          <Text style={styles.textstyles}>Add {stageDetails.stageName} link</Text>
          <View style={styles.spacetop}></View>
          <TextInput
            style={styles.input}
            value={link}
            onChangeText={setLink}
            placeholder="New Link"
          />
          <Pressable style={styles.button2} onPress={handleUpdateLink}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.spacetop}></View>
      {linkDetails && (
        <View style={styles.card}>
          <Pressable onPress={() => Linking.openURL(String(linkDetails?.link))}>
            <Text style={styles.textblue}>{linkDetails.link ? linkDetails.link : 'None'}</Text>
          </Pressable>
        </View>
      )}
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
  space: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacetop: {
    paddingTop: 30,
  },
});
