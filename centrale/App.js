import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [isLoaded] = useFonts({
    "league": require("./assets/fonts/LeagueSpartan-SemiBold.ttf"),
  });
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={handleOnLayout} >
      <View style={styles.div}>
      <Text style={styles.textstyles}>Project Centrale</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3734A9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyles:{
color:"white",
fontFamily:"league",
fontSize:50,
  },
  div:{
backgroundColor:"#E652FF",
padding:75,
borderRadius:15

  },
});
