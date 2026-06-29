import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SmartSchedulingScreen from '../screens/SmartSchedulingScreen';
import DashboardScreen from '../screens/DashboardScreen'; 
import AttendanceScreen from '../screens/AttendanceScreen';
import EmergencyAlertScreen from '../screens/EmergencyAlertScreen';
import ChatScreen from '../screens/ChatScreen';
import AuthScreen from '../screens/AuthScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. We wrap all your existing Campus Connect tabs into one component
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#33691E',
        tabBarInactiveTintColor: '#757575',
        headerStyle: { backgroundColor: '#33691E' },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{ title: 'Campus Dashboard' }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ title: 'Campus Chat' }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={SmartSchedulingScreen} 
        options={{ title: 'Timetable' }}
      />
      <Tab.Screen 
        name="Attendance" 
        component={AttendanceScreen} 
        options={{ title: 'Log Attendance' }}
      />
      <Tab.Screen 
        name="Emergency" 
        component={EmergencyAlertScreen} 
        options={{ title: 'SOS Alert' }}
      />
    </Tab.Navigator>
  );
}

// 2. The main navigator now controls the gateway: Login -> Dashboard
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* The app loads the Login/Signup screen first */}
        <Stack.Screen name="Auth" component={AuthScreen} />
        {/* On successful login, it unlocks the Main Tabs */}
        <Stack.Screen name="Dashboard" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}