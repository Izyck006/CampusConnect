import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Vibration } from 'react-native';

const EmergencyAlertScreen = () => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    if (isAlertActive) {
      
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isAlertActive]);

    const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const confirmEmergency = () => {
    Vibration.vibrate(500);

    Alert.alert(
      "⚠️ CONFIRM EMERGENCY",
      "Broadcast your location to BUK Security?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "SEND ALERT", 
          style: "destructive",
          onPress: () => {
            Vibration.vibrate([500, 500, 500, 500, 500]); 
            setElapsedTime(0);
            setIsAlertActive(true);
          }
        }
      ]
    );
  };

  const cancelAlert = () => {
    setIsAlertActive(false);
    
    Alert.alert(
      "Incident Resolved", 
      `The alert was active for ${formatTime(elapsedTime)}. Security stands down.`
    );
    setElapsedTime(0);
  };

  return (
    <View style={[styles.container, isAlertActive && styles.containerActive]}>
      <View style={styles.header}>
        <Text style={[styles.title, isAlertActive && styles.textLight]}>
          Emergency Alert
        </Text>
        <Text style={[styles.subtitle, isAlertActive && styles.textLight]}>
          Emergency Alert
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {isAlertActive ? (
          <View style={styles.activeState}>
            <Text style={styles.alertText}>ALERT ACTIVE</Text>
            
            <View style={styles.timerBox}>
              <Text style={styles.timerLabel}>AWAITING RESPONDERS</Text>
              <Text style={styles.timerNumber}>{formatTime(elapsedTime)}</Text>
            </View>

            <Text style={styles.infoText}>
              Security dispatch has your coordinates. Do not close this app until help arrives.
            </Text>
            
            <TouchableOpacity style={styles.cancelButton} onPress={cancelAlert}>
              <Text style={styles.cancelButtonText}>Stop Alert</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.sosButton} 
            activeOpacity={0.9} 
            onPress={confirmEmergency}
          >
            <View style={styles.sosInner}>
              <Text style={styles.sosText}>ALERT</Text>
              <Text style={styles.sosSubtext}>Tap to Alert Security</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  containerActive: {
    backgroundColor: '#B71C1C', 
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  textLight: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 8,
    borderColor: '#FFCDD2',
  },
  sosInner: {
    alignItems: 'center',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: '900',
    letterSpacing: 5,
  },
  sosSubtext: {
    color: '#FFCDD2',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  activeState: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  alertText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  timerLabel: {
    color: '#FFCDD2',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 5,
  },
  timerNumber: {
    fontSize: 72,
    fontWeight: '900',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'], 
  },
  infoText: {
    fontSize: 16,
    color: '#FFCDD2',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cancelButtonText: {
    color: '#B71C1C',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
});

export default EmergencyAlertScreen;