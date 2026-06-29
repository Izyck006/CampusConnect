import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Screen Imports
import DashboardScreen from '../screens/DashboardScreen'; 
import ChatScreen from '../screens/ChatScreen';
import SmartSchedulingScreen from '../screens/SmartSchedulingScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import EmergencyAlertScreen from '../screens/EmergencyAlertScreen';
import AuthScreen from '../screens/AuthScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. The Bottom Tabs (Visible after successful login)
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Dynamically assign icons based on the active tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Attendance') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Emergency') {
            iconName = focused ? 'warning' : 'warning-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Styling the Nav Bar and Header
        tabBarActiveTintColor: '#33691E',
        tabBarInactiveTintColor: '#F50057',
        headerStyle: { backgroundColor: '#33691E' },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
        tabBarLabelStyle: { fontSize: 11, paddingBottom: 2 },
      })}
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
        options={{ title: 'Smart Scheduling' }} 
      />
      <Tab.Screen 
        name="Attendance" 
        component={AttendanceScreen} 
        options={{ title: 'Attendance Tracker' }} 
      />
      <Tab.Screen 
        name="Emergency" 
        component={EmergencyAlertScreen} 
        options={{ title: 'Alert' }} 
      />
    </Tab.Navigator>
  );
}

// 2. The Master Gateway (Controls Auth vs Main App)
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