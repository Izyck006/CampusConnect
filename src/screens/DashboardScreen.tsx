import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Ionicons } from '@expo/vector-icons'; 

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decoded = jwtDecode(token);
          setUserName((decoded as any).user.name);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to securely log out of Campus Connect?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
           await AsyncStorage.removeItem('userToken');
            
           navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' as never }],
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
       
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            
           
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={28} color="#F50057" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.universityText}>Bayero University Kano</Text>
        </View>

        
        <View style={styles.modulesContainer}>
          <Text style={styles.sectionTitle}>Campus Modules</Text>

          
          <TouchableOpacity 
            style={styles.moduleCard}
            onPress={() => navigation.navigate('Chat' as never)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="chatbubbles-outline" size={28} color="#33691E" />
            </View>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>Campus Chat</Text>
              <Text style={styles.moduleDescription}>Connect with BUK students and faculty.</Text>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity 
            style={styles.moduleCard}
            onPress={() => navigation.navigate('Schedule' as never)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={28} color="#33691E" />
            </View>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>Smart Scheduling</Text>
              <Text style={styles.moduleDescription}>View your timetable and room assignments.</Text>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity 
            style={styles.moduleCard}
            onPress={() => navigation.navigate('Attendance' as never)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-done-outline" size={28} color="#33691E" />
            </View>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>Attendance Tracker</Text>
              <Text style={styles.moduleDescription}>Log your presence in your current department.</Text>
            </View>
          </TouchableOpacity>

       
          <TouchableOpacity 
            style={styles.moduleCard}
            onPress={() => navigation.navigate('Emergency' as never)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="warning-outline" size={28} color="#D32F2F" />
            </View>
            <View style={styles.moduleTextContainer}>
              <Text style={[styles.moduleTitle, { color: '#D32F2F' }]}>Emergency Alert</Text>
              <Text style={styles.moduleDescription}>Instantly broadcast your location to campus security.</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#33691E',
    padding: 25,
    paddingTop: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 25,
  },
  
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoutButton: {
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 50,
  },
  
  welcomeText: {
    color: '#E8F5E9',
    fontSize: 16,
    marginBottom: 5,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  universityText: {
    color: '#C8E6C9',
    fontSize: 14,
    fontWeight: '500',
  },
  modulesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  moduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleTextContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
});

export default DashboardScreen;