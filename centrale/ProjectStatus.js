import React, { useEffect, useState } from "react";
import {
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
import { useCallback } from "react";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
export default function ProjectStatus({ navigation }) {
  const [studentData,setStudentData] = useState(null)
  const [teamData,setTeamData] = useState(null)
  const [projectData,setProjectData] = useState(null)
  const[success, setSuccess] = useState(null)
  const[success2, setSuccess2] = useState(null)
  const[success3, setSuccess3] = useState(null)
  const[success4, setSuccess4] = useState(null)
  const[success5, setSuccess5] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  const extractContentFromGoogleDriveDoc = async (docUrl) => {
    try {
      // Fetch content from Google Drive
      const response = await fetch(docUrl);
      const content = await response.text();
  
      // Log fetched content
      console.log('Fetched content:', content);
  
      // Convert content to PDF
      const pdf = await Print.printToFileAsync({
        html: content,
      });
  
      // Log generated PDF file URI
      console.log('Generated PDF URI:', pdf.uri);
  
      // Share PDF file
      await sharePDF(pdf.uri);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to extract content from Google Drive document');
    }
  };
  
  const sharePDF = async (pdfUri) => {
    try {
      // Create a directory for storing PDF files
      const directory = `${FileSystem.cacheDirectory}pdfs/`;
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  
      // Move the PDF file to the directory
      const fileName = 'document.pdf';
      const newPath = `${directory}${fileName}`;
      await FileSystem.moveAsync({ from: pdfUri, to: newPath });
  
      // Share PDF file
      await Sharing.shareAsync(newPath);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to share PDF file');
    }
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
  
    try {
      const data = await fetchProjectData(teamData?.id);
      
      // Assuming fetchProjectData resolves with the actual data
      setProjectData(data);
  
      setSuccess(false);
      setSuccess2(false);
      setSuccess3(false);
      setSuccess4(false);
      setSuccess5(false);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  }, [teamData?.id]);

  const handleSubmit = () => {
   
    const apiUrl = `https://centrale.onrender.com/project/synopsis/approval/update/teamid/${teamData.id}`;
  
    const requestData = {
      synopsisApproval:1
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
  const handleSubmit2 = () => {
   
    const apiUrl = `https://centrale.onrender.com/project/design/approval/update/teamid/${teamData.id}`;
  
    const requestData = {
      designApproval:1
    };
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(setSuccess2(true))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };
  const handleSubmit3 = () => {
   
    const apiUrl = `https://centrale.onrender.com/project/codephase1/approval/update/teamid/${teamData.id}`;
  
    const requestData = {
      codephase1Approval:1
    };
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(setSuccess3(true))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };
  const handleSubmit4 = () => {
   
    const apiUrl = `https://centrale.onrender.com/project/codephase2/approval/update/teamid/${teamData.id}`;
  
    const requestData = {
      codephase2Approval:1
    };
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(setSuccess4(true))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };
  const handleSubmit5 = () => {
   
    const apiUrl = `https://centrale.onrender.com/project/report/approval/update/teamid/${teamData.id}`;
  
    const requestData = {
      reportApproval:1
    };
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(setSuccess5(true))
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
      });
  };
  const fetchProjectData = (teamId) => {
    const apiUrl = `https://centrale.onrender.com/project/teamid/${teamId}`;
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
    const apiUrl = `https://centrale.onrender.com/team/studentid/${studentId}`;
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
const getCompletionPercentage = () => {
    if (projectData?.synopsis && projectData?.design && projectData?.first_presentation && projectData?.codephase1 && projectData?.second_presentation && projectData?.codephase2 && projectData?.final_presentation && projectData?.reportApproval) {
      return <Text style={styles.cardtext}>100%</Text>; 
    } else if (projectData?.synopsisApproval && projectData?.designApproval && projectData?.first_presentation && projectData?.codephase1Approval && projectData?.second_presentation && projectData?.codephase2Approval && projectData?.final_presentation) {
      return <Text style={styles.cardtext}>88%</Text>;
    } else if (projectData?.synopsisApproval && projectData?.designApproval && projectData?.first_presentation && projectData?.codephase1Approval && projectData?.second_presentation && projectData?.codephase2Approval) {
      return <Text style={styles.cardtext}>76%</Text>;
    }   else if (projectData?.synopsisApproval && projectData?.designApproval && projectData?.first_presentation && projectData?.codephase1Approval && projectData?.second_presentation ) {
      return <Text style={styles.cardtext}>60%</Text>;
    }   else if (projectData?.synopsisApproval && projectData?.designApproval && projectData?.first_presentation && projectData?.codephase1Approval) {
      return <Text style={styles.cardtext}>48%</Text>;
    }   else if (projectData?.synopsisApproval && projectData?.designApproval && projectData?.first_presentation ) {
      return <Text style={styles.cardtext}>36%</Text>;
    }   else if (projectData?.synopsisApproval && projectData?.designApproval) {
      return <Text style={styles.cardtext}>24%</Text>;
    }  else if (projectData?.synopsisApproval) {
      return <Text style={styles.cardtext}>12%</Text>;
    }
    else {
      return <Text style={styles.cardtext}>0%</Text>;
    }
  };
console.log(studentData)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.container}>
            <Text style={styles.textstyles}>Project Status</Text>
            <View style={styles.spacetop}></View>
            <View style={styles.card}>
              {getCompletionPercentage()}
            </View>
            <View style={styles.spacetop}></View>
            <View style={styles.buttonred}>
              <Pressable onPress={()=>extractContentFromGoogleDriveDoc(projectData?.synopsis)}>
                <Text style={styles.text}>Generate Report</Text>
              </Pressable>
            </View>
            <View style={styles.spacetop}></View>
            <View style={styles.cardlayout}>
            {projectData?.synopsis ?
            <View style={styles.button2}>
              <Pressable onPress={()=> {
                Linking.openURL(projectData.synopsis)
              }}>
<Text style={styles.text}>Synopsis</Text>
              </Pressable>
            </View>
:<View></View>}
<View style={styles.space}></View>
{studentData?.type=='teacher' && projectData?.synopsis ? <View style={styles.buttonwhite}>
              <Pressable onPress={handleSubmit}>
                <Text style={styles.textblue}>{projectData?.synopsisApproval? "Approved✅" :"Approve"}</Text>
              </Pressable>
            </View>:<View></View>}
            </View>
            {success?<Text style={styles.text}>Approved Successfully🎊</Text>:<Text></Text>}
   <View style={styles.spacetop}></View>
   <View style={styles.cardlayout}>
     {projectData?.design ?
            <View style={styles.button2}>
              <Pressable onPress={()=> {
                Linking.openURL(projectData.design)
              }}>
<Text style={styles.text}>Design</Text>
              </Pressable>
            </View>
:<View></View>}
<View style={styles.space}></View>
{studentData?.type=='teacher' && projectData?.design ? <View style={styles.buttonwhite}>
              <Pressable onPress={handleSubmit2}>
                <Text style={styles.textblue}>{projectData?.designApproval? "Approved✅" :"Approve"}</Text>
              </Pressable>
            </View>:<View></View>}
</View>
{success2?<Text style={styles.text}>Approved Successfully🎊</Text>:<Text></Text>}
   <View style={styles.spacetop}></View>
   <View style={styles.cardlayout}>
     {projectData?.codephase1 ?
            <View style={styles.button2}>
              <Pressable onPress={()=> {
                Linking.openURL(projectData.codephase1)
              }}>
<Text style={styles.text}>Codephase1</Text>
              </Pressable>
            </View>
:<View></View>}
<View style={styles.space}></View>
{studentData?.type=='teacher' && projectData?.codephase1 ? <View style={styles.buttonwhite}>
              <Pressable onPress={handleSubmit3}>
                <Text style={styles.textblue}>{projectData?.codephase1Approval? "Approved✅" :"Approve"}</Text>
              </Pressable>
            </View>:<View></View>}
</View>
{success3?<Text style={styles.text}>Approved Successfully🎊</Text>:<Text></Text>}
   <View style={styles.spacetop}></View>
   <View style={styles.cardlayout}>
{projectData?.codephase2 ?
            <View style={styles.button2}>
              <Pressable onPress={()=> {
                Linking.openURL(projectData.codephase2)
              }}>
<Text style={styles.text}>Codephase2</Text>
              </Pressable>
            </View>
:<View></View>}
<View style={styles.space}></View>
{studentData?.type=='teacher' && projectData?.codephase2 ? <View style={styles.buttonwhite}>
              <Pressable onPress={handleSubmit4}>
                <Text style={styles.textblue}>{projectData?.codephase2Approval? "Approved✅" :"Approve"}</Text>
              </Pressable>
            </View>:<View></View>}
</View>
{success4?<Text style={styles.text}>Approved Successfully🎊</Text>:<Text></Text>}
   <View style={styles.spacetop}></View>
   <View style={styles.cardlayout}>
   {projectData?.report ?
            <View style={styles.button2}>
              <Pressable onPress={()=> {
                Linking.openURL(projectData.report)
              }}>
<Text style={styles.text}>Report</Text>
              </Pressable>
            </View>
:<View></View>}
<View style={styles.space}></View>
{studentData?.type=='teacher' && projectData?.report ? <View style={styles.buttonwhite}>
              <Pressable onPress={handleSubmit5}>
                <Text style={styles.textblue}>{projectData?.reportApproval? "Approved✅" :"Approve"}</Text>
              </Pressable>
            </View>:<View></View>}
</View>
{success5?<Text style={styles.text}>Approved Successfully🎊</Text>:<Text></Text>}
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
