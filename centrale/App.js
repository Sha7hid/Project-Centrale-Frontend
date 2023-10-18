import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
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
fontWeight:'bold',
color:"white",
fontFamily:"LeagueSpartanSemiBold"
  },
  div:{
backgroundColor:"#E652FF",
padding:75,
borderRadius:15

  },
});
