import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SmartSchedulingScreen from '../screens/SmartSchedulingScreen';
import DashboardScreen from '../screens/DashboardScreen'; 
import AttendanceScreen from '../screens/AttendanceScreen';
import EmergencyAlertScreen from '../screens/EmergencyAlertScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#33691E',
          tabBarInactiveTintColor: '#757575',
          headerStyle: { backgroundColor: '#33691E' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
        }}
      >
        {/* 2. Swap out the old component for DashboardScreen */}
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
    </NavigationContainer>
  );
}