import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define the navigation types so TypeScript doesn't yell at us
type TabParamList = {
  Home: undefined;
  Chat: undefined;
};
type DashboardNavProp = BottomTabNavigationProp<TabParamList, 'Home'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNavProp>();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.studentName}>Student (Group 7)</Text>
        <Text style={styles.universityText}>Bayero University Kano</Text>
      </View>

      {/* Quick Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Classes Today</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>
      </View>

      {/* Module Cards */}
      <View style={styles.modulesContainer}>
        <Text style={styles.sectionTitle}>Campus Modules</Text>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.cardTitle}>💬 Campus Chat</Text>
          <Text style={styles.cardDescription}>Connect with BUK students and faculty.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Schedule' as never)}
        >
          <Text style={styles.cardTitle}>📅 Smart Scheduling</Text>
          <Text style={styles.cardDescription}>View your timetable and room assignments.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Attendance' as never)}
        >
          <Text style={styles.cardTitle}>Attendance Tracker</Text>
          <Text style={styles.cardDescription}>Log your presence in your current department.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#D32F2F' }]} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Emergency' as never)}
        >
          <Text style={[styles.cardTitle, { color: '#D32F2F' }]}>🚨 Emergency SOS</Text>
          <Text style={styles.cardDescription}>Instantly broadcast your location to campus security.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#33691E',
    padding: 25,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    color: '#E8F5E9',
    fontSize: 16,
  },
  studentName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  universityText: {
    color: '#C8E6C9',
    fontSize: 14,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20,
    paddingHorizontal: 15,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#33691E',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  modulesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#33691E',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardDescription: {
    fontSize: 13,
    color: '#757575',
    marginTop: 5,
  },
});

export default DashboardScreen;