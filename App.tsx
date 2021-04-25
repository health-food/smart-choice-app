import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme } from 'react-native-paper';
import {StartScreen} from "./src/screens/StartScreen";
import {LoginScreen} from "./src/screens/LoginSreen";
import {RegisterScreen} from "./src/screens/RegisterScreen";
import {ResetPasswordScreen} from "./src/screens/ResetPasswordScreen";
import {HomeScreen} from "./src/screens/HomeScreen";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export default function App() {
  return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName="HomeScreen"
              screenOptions={{
                headerShown: false,
              }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
