// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import User from './User';
import { UserProvider } from './UserContext';
import Profile from './Profile';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{
            headerTitle: () => <Header />,
            headerStyle: {
              backgroundColor: '#3734A9',
              height: 120,
            }
          }} component={Home} />
        <Stack.Screen name="login"
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Login} />
        <Stack.Screen name="signup"
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Signup} />
         <Stack.Screen name="user"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={User} />
           <Stack.Screen name="profile"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

export default App;