import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Ionicons } from '@expo/vector-icons';

interface Session {
  id: string;
  time: string;
  topic: string;
  location: string;
  type: string;
  host: string;
  color: string;
}

const SmartSchedulingScreen = () => {
  const [schedule, setSchedule] = useState<Session[]>([]);
  const [userName, setUserName] = useState('Student');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTime, setNewTime] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decoded = jwtDecode(token);
          setUserName((decoded as any).user.name);
        }
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };
    fetchUser();
  }, []);

  const handleAddSession = () => {
    if (!newTopic.trim() || !newLocation.trim() || !newTime.trim()) {
      Alert.alert("Missing Details", "Please fill in what you're reading, where you are, what level, and the time!");
      return;
    }

    const newSession: Session = {
      id: Math.random().toString(), 
      time: newTime.trim(),
      topic: newTopic.trim(),
      location: newLocation.trim(),
      type: 'Study Group',
      host: userName || 'Student', 
      color: '#1976D2' 
    };

    
    setSchedule((prev) => [...prev, newSession]);
    
    
    setNewTopic('');
    setNewLocation('');
    setNewTime('');
    setModalVisible(false);
    
    Alert.alert("Posted!", "Your study session is now live on the campus calendar.");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.header}>
          <Text style={styles.dateText}>Campus SmartScheduling</Text>
          <Text style={styles.subText}>Find study groups</Text>
        </View>

        <View style={styles.timelineContainer}>
          {schedule.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={60} color="#BDBDBD" />
              <Text style={styles.emptyStateText}>No active study sessions.</Text>
              <Text style={styles.emptyStateSub}>Tap the + button to share yours!</Text>
            </View>
          ) : (
            schedule.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  {index !== schedule.length - 1 && <View style={styles.line} />}
                </View>

                <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.time, { color: item.color }]}>{item.time}</Text>
                  </View>
                  
                  <Text style={styles.topic}>{item.topic}</Text>
                  
                  <View style={styles.detailsRow}>
                    <View style={styles.locationBadge}>
                      <Ionicons name="location" size={14} color="#666" />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    
                    <View style={styles.hostBadge}>
                      <Ionicons name="person" size={14} color="#666" />
                      <Text style={styles.hostText}>{item.host}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Broadcast Study Session</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>What are you reading?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. System Architecture"
              value={newTopic}
              onChangeText={setNewTopic}
            />
             <Text style={styles.label}>What level?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Level 200"
              value={level}
              onChangeText={setLevel}
            />

            <Text style={styles.label}>Where are you?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Faculty Library - Table 4"
              value={newLocation}
              onChangeText={setNewLocation}
            />

            <Text style={styles.label}>Time: </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 04:00 PM - 06:00 PM"
              value={newTime}
              onChangeText={setNewTime}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAddSession}>
              <Text style={styles.submitText}>Post to Campus</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollArea: {
    flex: 1,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#757575',
    marginTop: 15,
    fontWeight: 'bold',
  },
  emptyStateSub: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 8,
  },
  timelineContainer: {
    padding: 20,
    paddingBottom: 100, 
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
    marginBottom: -25, 
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  time: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  collabBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  collabText: {
    color: '#1976D2',
    fontSize: 10,
    fontWeight: 'bold',
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  hostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FBE7',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  hostText: {
    fontSize: 12,
    color: '#827717',
    marginLeft: 4,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#33691E',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 1, 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#33691E',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#33691E',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SmartSchedulingScreen;