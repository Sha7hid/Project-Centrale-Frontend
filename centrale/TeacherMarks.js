import React, { useEffect, useState } from "react";
import { Button, Pressable,RefreshControl,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
export default function TeacherMarks({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [markdata,setMarkdata] = useState(null)
  const [deleteResult, setDeleteResult] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(()=>{
 // Replace the URL with your actual API endpoint
 const apiUrl = `https://centrale.onrender.com/marks`;
  
 fetch(apiUrl)
   .then(response => response.json())
.then(data => setMarkdata(data))
   .catch(error => {
     // Handle any errors that occur during the fetch
     console.error('Error:', error);
   });

  },[]);
  useEffect(()=>{
    // Replace the URL with your actual API endpoint
    const apiUrl = `https://centrale.onrender.com/users`;
     
    fetch(apiUrl)
      .then(response => response.json())
   .then(data => setStudentsData(data))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
   
     },[]);
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
  const getStudentName = (studentId) => {
    if (studentsData) {
      const student = studentsData.find((student) => student.id === studentId);
      return student ? student?.name : "Unknown Student";
    }
    return "Loading Student Data...";
  };
  const exportToExcel = async () => {
    try {
      // Create a CSV string from the markdata including student names
      const csvData = markdata.map(data => {
        const studentName = getStudentName(data.studentid);
        // Rearrange the order of fields to have student name as the first column
        return Object.values({ studentName, ...data }).join(',');
      });
  
      // Create a CSV header including "Student Name" field
      const header = Object.keys({ studentName: '', ...markdata[0] }).join(',');
  
      // Combine header and CSV data
      const csv = `${header}\n${csvData.join('\n')}`;
  
      // Define the file path
      const path = FileSystem.documentDirectory + 'student_marks.csv';
  
      // Write CSV data to file
      await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });
  
      // Share the file
      await Sharing.shareAsync(path, { mimeType: 'text/csv', dialogTitle: 'Share this CSV file' });
  
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.container}>
      <Text style={styles.textstyles}>Student Marks</Text>
     <Pressable onPress={exportToExcel} style={styles.button2}>
      <Text style={styles.text}>Export To Excel</Text>
     </Pressable>
      <View style={styles.spacetop}></View>
{markdata?.map((data) =>(
        <>
        <View key={data.id} style={styles.card}>
          <Text>Id: {data.id}</Text>
          <Text>Student Name: {getStudentName(data.studentid)}</Text>
          <Text >Synopsis: {data.synopsis? data.synopsis: 0}</Text>
          <Text >Design: {data.design? data.design: 0}</Text>
          <Text>First Presentation: {data?.first_presentation ? data?.first_presentation : 0}</Text>
          <Text>50% Coding: {data?.fifty_percent_coding ? data?.fifty_percent_coding : 0}</Text>
          <Text>Second Presentation: {data?.second_presentation ? data?.second_presentation : 0}</Text>
          <Text>100% Coding: {data?.hundred_percent_coding ? data?.hundred_percent_coding : 0}</Text>
          <Text>Final Presentation: {data?.final_presentation ? data?.final_presentation : 0}</Text>
          <Text>Report: {data?.report ? data?.report : 0}</Text>
          <Text>Attendance: {data?.attendance ? data?.attendance : 0}</Text>
          <View style={styles.spacetop}></View>
        </View>
        <View style={styles.spacetop}></View>
        </>
      ))}

     
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
  buttonred:{
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
