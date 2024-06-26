import React, { useEffect, useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function User({ navigation }) {
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

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
      {/* Render your component with studentData */}
      {studentData && (
        <>
          <View>
            <Text style={styles.textstyles}>Project</Text>
            <Text style={styles.textstyles}>Centrale</Text>
               {/* Data shown to students */}
            {studentData.type === "student" && (
              <>
                <View style={styles.cardlayout}>
                  <Pressable onPress={() => navigation.navigate('choosetopic')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Project</Text>
                      <Text style={styles.cardtext}>Name</Text>
                    </View>
                  </Pressable>
                  <View style={styles.space}></View>
                  <Pressable onPress={() => navigation.navigate('projectstatus')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Project</Text>
                      <Text style={styles.cardtext}>Status</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={styles.spacetop}></View>
                <View style={styles.cardlayout}>
                <Pressable onPress={() => navigation.navigate('uploaddocuments')}>
                  <View style={styles.card}>
                    <Text style={styles.cardtext}>Upload</Text>
                    <Text style={styles.cardtext}>Files</Text>
                  </View>
                </Pressable>
                <View style={styles.space}></View>
                <Pressable onPress={() => navigation.navigate('marks')}>
                  <View style={styles.card}>
                    <Text style={styles.cardtext}>Marks</Text>
                    <Text style={styles.cardtext}>  </Text>
                  </View>
                </Pressable>
                </View>
                <View style={styles.spacetop}></View>
              </>
            )}
            {/* Data shown to teachers */}
            {studentData.type === "teacher" && (
              <>
                {/* <View style={styles.cardlayout}>
                  <Pressable onPress={() => navigation.navigate('chooseteam')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Choose</Text>
                      <Text style={styles.cardtext}>Team</Text>
                    </View>
                  </Pressable>
                  <View style={styles.space}></View>
                  <Pressable onPress={() => navigation.navigate('guidemeeting')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Guide</Text>
                      <Text style={styles.cardtext}>meeting</Text>
                    </View>
                  </Pressable>
                </View> */}
                <View style={styles.spacetop}></View>
                <View style={styles.cardlayout}>
                  <Pressable onPress={() => navigation.navigate('uploadmarks')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Upload</Text>
                      <Text style={styles.cardtext}>Marks</Text>
                    </View>
                  </Pressable>
                  <View style={styles.space}></View>
                  <Pressable onPress={() => navigation.navigate('projectstatus')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Project</Text>
                      <Text style={styles.cardtext}>Status</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={styles.cardlayout}>
                  <Pressable onPress={() => navigation.navigate('teachermarks')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Marks</Text>
                    </View>
                  </Pressable>
                  <View style={styles.space}></View>
                  <Pressable onPress={() => navigation.navigate('teacherusers')}>
                    <View style={styles.card}>
                      <Text style={styles.cardtext}>Student</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={styles.spacetop}></View>
              </>
            )}
             {/* Data shown to teachers */}
             {studentData.type === "admin" && (
              <>
                <View style={styles.cardlayoutadmin}>
                  <Pressable onPress={() => navigation.navigate('adminusers')}>
                    <View style={styles.cardadmin}>
                      <Text style={styles.cardtext}>Users</Text>
                    </View>
                  </Pressable>
                  <View style={styles.spacetop}></View>
                  <Pressable onPress={() => navigation.navigate('adminteam')}>
                    <View style={styles.cardadmin}>
                      <Text style={styles.cardtext}>Teams</Text>
                    </View>
                  </Pressable>
                  <View style={styles.spacetop}></View>
                  <Pressable onPress={() => navigation.navigate('admindepartment')}>
                    <View style={styles.cardadmin2}>
                      <Text style={styles.cardtext}>Departments</Text>
                    </View>
                  </Pressable>
                  <View style={styles.spacetop}></View>
                  <Pressable onPress={() => navigation.navigate('adminstage')}>
                    <View style={styles.cardadmin}>
                      <Text style={styles.cardtext}>Stages</Text>
                    </View>
                  </Pressable>
                  <View style={styles.spacetop}></View>
                  <Pressable onPress={() => navigation.navigate('adminprojectstage')}>
                    <View style={styles.cardadmin2}>
                      <Text style={styles.cardtext}>Project Stages</Text>
                    </View>
                  </Pressable>
                  <View style={styles.spacetop}></View>
                  <Pressable onPress={() => navigation.navigate('adminmarks')}>
                    <View style={styles.cardadmin}>
                      <Text style={styles.cardtext}>Marks</Text>
                    </View>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </>
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
