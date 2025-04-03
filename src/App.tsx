import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screen/HomeScreen';
import ProfileScreen from './screen/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const App = () =>  {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={HomeScreen} />
        <Stack.Screen name="MyTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
