import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function TeacherMarks({ navigation }) {
  const [studentData, setStudentData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredMarkData, setFilteredMarkData] = useState(null);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Fetch mark data from the API
    fetchMarksData();
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
    if (markData && !filteredMarkData) {
      filterMarkDataByDeptId();
    }
    setLoading(false);
  }, [markData, filteredMarkData]);
  
  const filterMarkDataByDeptId = () => {
    if (!markData) return;
    const filteredMarks = markData.projectStageMarks.filter(mark => mark.deptId === studentData.deptId);
    setFilteredMarkData({ ...markData, projectStageMarks: filteredMarks });
  };


  const fetchMarksData = async () => {
    try {
      const apiUrl = `https://centrale.onrender.com/projectStageMarks/all`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMarkData(data);
    } catch (error) {
      console.error('Error fetching mark data:', error);
    }
  };

  const exportToExcel = async () => {
    try {
      if (!markData) return;

      // Group mark data by student name
      const groupedData = groupMarksByStudentName(markData.projectStageMarks,studentData.deptId);

      // Create CSV string for each student
      const csvData = Object.entries(groupedData).map(([studentName, stages]) => {
        const row = stages.map(stage => `${stage.stageName}: ${stage.marks != null ? stage.marks : 'N/A'}`).join(', ');
        return `${studentName}, ${row}`;
      }).join('\n');

      // Define CSV header
      const header = 'Student Name, Marks';

      // Combine header and CSV data
      const csv = `${header}\n${csvData}`;

      // Define file path
      const path = FileSystem.documentDirectory + 'student_marks.csv';

      // Write CSV data to file
      await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });

      // Share the file
      await Sharing.shareAsync(path, { mimeType: 'text/csv', dialogTitle: 'Share this CSV file' });
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  // Function to group mark data by student name
  const groupMarksByStudentName = (markData, deptId) => {
    return markData.reduce((acc, curr) => {
      const studentName = curr.userName;
      // Check if the mark's department ID matches the specified deptId
      if (curr.deptId === deptId) {
        if (!acc[studentName]) {
          acc[studentName] = [];
        }
        acc[studentName].push({ stageName: curr.stageName, marks: curr.marks });
      }
      return acc;
    }, {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <Text style={styles.textstyles}>Student Marks</Text>
          <View style={styles.spacetop}></View>
          <Pressable onPress={exportToExcel} style={styles.button2}>
            <Text style={styles.text}>Export To Excel</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <ActivityIndicator animating={loading} color={'white'} size={'large'} />
          {markData && markData.success ? (
  Object.entries(groupMarksByStudentName(markData.projectStageMarks,studentData.deptId)).map(([studentName, stages], index) => {
  
    return (
      <View key={index} style={styles.card}>
        <Text style={styles.text2}>Student Name: {studentName}</Text>
        {stages.map((stage, idx) => (
          <Text key={idx}>{stage.stageName}: {stage.marks != null ? stage.marks : 'N/A'}</Text>
        ))}
        <View style={styles.spacetop}></View>
      </View>
    );
  })
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
    width:'90%',
    marginBottom:20
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
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  space: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacetop: {
    paddingTop: 30,
  },
});
