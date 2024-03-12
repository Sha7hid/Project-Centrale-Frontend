import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable,RefreshControl,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
export default function AdminUsers({navigation}) {
  const [studentData, setStudentData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [departments, setDepartments] = useState({});
  const [deleteResult, setDeleteResult] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [animating,setAnimating] = useState(true);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchUsers();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
  }, []);

  const fetchDepartments = () => {
    fetch('https://centrale.onrender.com/departments')
      .then(response => response.json())
      .then(departmentsData => {
        const departmentsMap = {};
        departmentsData.forEach(department => {
          departmentsMap[department.departmentId] = department.departmentName;
        });
        setDepartments(departmentsMap);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  };

  const fetchUsers = () => {
    fetch('https://centrale.onrender.com/users')
      .then(response => response.json())
      .then(usersData => {
        setStudentsData(usersData);
        setAnimating(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <Pressable onPress={() => navigation.navigate('addnewuser')} style={styles.button2}>
            <Text style={styles.text}>Add New User</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <Pressable onPress={() => navigation.navigate('deleteuser')} style={styles.button2}>
            <Text style={styles.text}>Delete User</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <Pressable onPress={() => navigation.navigate('updateuser')} style={styles.button2}>
            <Text style={styles.text}>Update A User</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <ActivityIndicator animating={animating} color={'white'} size={'large'}/>
          {studentsData?.map((data) =>(
            <>
              <View key={data.id} style={styles.card}>
                <Text>Id: {data.userId}</Text>
                <Text>Name: {data.name}</Text>
                <Text>Email: {data.email}</Text>
                <Text>Password: {data.password}</Text>
                <Text>Type: {data.type}</Text>
                <Text>Department: {departments[data.deptId] || "Null"}</Text>
                <View style={styles.spacetop}></View>
              </View>
              <View style={styles.spacetop}></View>
            </>
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
  card: {
    backgroundColor: "#fff",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 20,
    textAlign: "center",
    width:'90%'
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
