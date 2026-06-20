import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Dummy data for the prototype UI
const SCHEDULE_DATA = [
  {
    id: '1',
    time: '09:00 AM - 11:00 AM',
    course: 'Advanced Software Engineering',
    location: 'Faculty of Computing - Room 302',
    type: 'Core',
    color: '#33691E' // Primary Green
  },
  {
    id: '2',
    time: '11:30 AM - 01:00 PM',
    course: 'Introduction to Computing',
    location: 'Faculty of Computing - Room 101',
    type: 'Elective',
    color: '#F57C00' // Orange for electives
  },
  {
    id: '3',
    time: '02:00 PM - 04:00 PM',
    course: 'Database Systems',
    location: 'CBN Hall',
    type: 'Core',
    color: '#33691E'
  }
];

const SmartSchedulingScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>Smart Scheduling</Text>
        <Text style={styles.subText}>Arrange your classes efficiently</Text>
      </View>

      <View style={styles.timelineContainer}>
        {SCHEDULE_DATA.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            {/* The Timeline Line and Dot */}
            <View style={styles.timelineIndicator}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              {index !== SCHEDULE_DATA.length - 1 && <View style={styles.line} />}
            </View>

            {/* The Class Card */}
            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <View style={styles.locationBadge}>
                <Text style={styles.locationText}>📍 {item.location}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  dateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  subText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  timelineContainer: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineIndicator: {
    width: 30,
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 5,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
    marginBottom: -25, // Connects to the next dot
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 10,
  },
  time: {
    fontSize: 13,
    color: '#33691E',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  course: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  locationBadge: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default SmartSchedulingScreen;