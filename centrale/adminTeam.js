import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminTeam({ navigation }) {
  const [teamsData, setTeamsData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [animating, setAnimating] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    const apiUrl = `https://centrale.onrender.com/project-teams`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTeamsData(data);
    } catch (error) {
      console.error('Error:', error);
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://centrale.onrender.com/project-teams`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTeamsData(data);
        setAnimating(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container2}>
          <Pressable onPress={() => navigation.navigate('addnewteam')} style={styles.button2}>
            <Text style={styles.text}>Add New Team</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <Pressable onPress={() => navigation.navigate('deleteteam')} style={styles.button2}>
            <Text style={styles.text}>Delete Team</Text>
          </Pressable>
          <View style={styles.spacetop}></View>
          <ActivityIndicator animating={animating} color={'white'} size={'large'} />
          {teamsData?.map((team, index) => (
            <View key={index} style={styles.card}>
              <Text>Team Name: {team.teamName}</Text>
              <Text>Project Name: {team.projectName}</Text>
              {/* <Text>Allocation User IDs: {team.allocationUserIds.join(', ')}</Text> */}
              {/* <Text>Users:</Text> */}
              <View>
                {team.users.map((user, i) => (
                  <View key={i}>
                    {user.type === 'teacher'? 
                    <><Text>Guide Name: {user.name}</Text><Text>Guide Email: {user.email}</Text></>
                    :
                    <><Text>Student Name {i+1}: {user.name}</Text></>
                }
                  </View>
                ))}
              </View>
            </View>
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
    flex: 1,
    backgroundColor: "#3734A9",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 21,
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
