import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Pressable, Alert, Linking } from "react-native";

export default function MarkDetails({ route }) {
  const { stageId } = route.params;
  const [link, setLink] = useState('');
  const [linkDetails, setLinkDetails] = useState(null);
  const [userPickerItems, setUserPickerItems] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [studentData, setStudentData] = useState(null);

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
    fetchUsers();
  }, [studentData]);

  const fetchUsers = () => {
    fetch('https://centrale.onrender.com/users')
      .then(response => response.json())
      .then(usersData => {
        // Filter users with type student and matching deptId
        const studentUsers = usersData.filter(user => user.type === 'student' && user.deptId === studentData.deptId);
        setUserPickerItems(studentUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleUpdateLink = async () => {
    const mark = parseInt(link)
    const markedBy = studentData.userId
    try {
      const apiUrl = `https://centrale.onrender.com/projectStageMarks/${selectedUserId}/${stageId}`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks:mark, markedBy:markedBy }),
      });
      if (response.ok) {
        Alert.alert('🎊', 'Successfully Added Link')
        // Update successful, fetch updated link details
        fetchStageDetails(selectedUserId);
        setLink('');
      } else {
        console.error('Failed to update link:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating link:', error);
    }
    setLink('')
    setSelectedUserId(null)
  };

  const fetchStageDetails = async (selectedUserId) => {
    try {
      const apiUrl = `https://centrale.onrender.com/projectStageMarks/${selectedUserId}/${stageId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLinkDetails(data);
    } catch (error) {
      console.error('Error fetching stage details:', error);
    }
  };
  useEffect(() => {
    fetchStageDetails(selectedUserId);
  }, [selectedUserId]);
console.log(userPickerItems)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textstyles}>Enter Marks</Text>
        <View style={styles.spacetop}></View>
        <Text style={styles.text}>Select User</Text>
        
        <Picker
          style={styles.input}
          selectedValue={selectedUserId}
          onValueChange={(itemValue, itemIndex) => setSelectedUserId(itemValue)}
        >
          <Picker.Item label="Select a student" value={null} />
          {userPickerItems.map((user) => (
            <Picker.Item key={user.userId} label={user.name} value={user.userId} />
          ))}
        </Picker>
      </View>
      <View style={styles.spacetop}></View>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Enter Mark"
      />
      <Pressable
        style={styles.button2}
        onPress={handleUpdateLink}
      >
        <Text style={styles.text}>Submit</Text>
      </Pressable>
      <View style={styles.spacetop}></View>
      {linkDetails && (
        <View style={styles.card}>
          <Pressable onPress={() => Linking.openURL(String(linkDetails?.link))}>
            <Text style={styles.textblue}>{linkDetails.marks ? linkDetails.marks : 'havent marked yet'}</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <Text style={styles.textblue}>{linkDetails.message? 'mark feature not added for user - contact admin' : ''}</Text>
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
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
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
    textblue: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#3734A9",
      },
  });