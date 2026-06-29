import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

// Target Coordinates (Matches the center of your seeded campus data)
const CAMPUS_LAT = 11.9815;
const CAMPUS_LNG = 8.4230;
const MAX_DISTANCE_METERS = 500; // Allow sign-in within 500 meters

const AttendanceScreen = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'in_bounds' | 'out_of_bounds'>('idle');
  const [distanceInfo, setDistanceInfo] = useState<number | null>(null);

  // Helper function to calculate distance in meters between two GPS coordinates
  const getDistanceFromLatLonInMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const verifyLocationAndSignIn = async () => {
    setIsChecking(true);
    setLocationStatus('idle');

    try {
      // 1. Ask the user for GPS hardware permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Campus Connect needs location access to verify attendance.');
        setIsChecking(false);
        return;
      }

      // 2. Ping the device's current location
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      
      // 3. Calculate distance from campus
      const distance = getDistanceFromLatLonInMeters(
        location.coords.latitude,
        location.coords.longitude,
        CAMPUS_LAT,
        CAMPUS_LNG
      );

      setDistanceInfo(Math.round(distance));

      // 4. Enforce the Geofence
      if (distance <= MAX_DISTANCE_METERS) {
        setLocationStatus('in_bounds');
        // Here is where you would normally call your Expo SQLite db.runAsync() to log the attendance!
      } else {
        setLocationStatus('out_of_bounds');
      }

    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve location. Please check your GPS signal.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>Attendance Tracker</Text>
        <Text style={styles.subtitle}>Verify your physical presence on campus to log today's attendance.</Text>
      </View>

      <View style={styles.statusContainer}>
        {isChecking ? (
          <>
            <ActivityIndicator size="large" color="#33691E" />
            <Text style={styles.statusText}>Pinging GPS satellites...</Text>
          </>
        ) : locationStatus === 'idle' ? (
          <Text style={styles.statusText}>Ready to verify location.</Text>
        ) : locationStatus === 'in_bounds' ? (
          <>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successText}>Location Verified!</Text>
            <Text style={styles.distanceText}>You are {distanceInfo}m from the campus center.</Text>
            <Text style={styles.successSub}>Attendance officially logged.</Text>
          </>
        ) : (
          <>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorText}>Out of Bounds</Text>
            <Text style={styles.distanceText}>You are {distanceInfo}m away from the campus.</Text>
            <Text style={styles.errorSub}>You must be within {MAX_DISTANCE_METERS}m to log attendance.</Text>
          </>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.button, isChecking && styles.buttonDisabled]} 
        onPress={verifyLocationAndSignIn}
        disabled={isChecking}
      >
        <Text style={styles.buttonText}>
          {isChecking ? 'Verifying...' : 'Log Attendance'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    justifyContent: 'center',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderTopWidth: 4,
    borderTopColor: '#33691E',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  statusContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 30,
    padding: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 10,
  },
  successIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  successSub: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 5,
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  errorSub: {
    fontSize: 14,
    color: '#D32F2F',
    marginTop: 5,
    textAlign: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#33691E',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#33691E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AttendanceScreen;