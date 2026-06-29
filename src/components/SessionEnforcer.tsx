import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

interface SessionEnforcerProps {
  children: React.ReactNode;
}

export default function SessionEnforcer({ children }: SessionEnforcerProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      setIsChecking(true);
      
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
              setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

   
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Group 7 Authentication',
        fallbackLabel: 'Use Device Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Biometric auth failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  // While checking hardware, show a loading spinner
  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#33691E" />
        <Text style={styles.text}>Securing Campus Connect...</Text>
      </View>
    );
  }

  // If authentication failed (they cancelled or scanned the wrong finger)
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Authentication Required</Text>
        <Text style={styles.subText}>Only Group 7 members can access this BUK data.</Text>
        <TouchableOpacity style={styles.button} onPress={authenticateUser}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If successful, render the rest of the app!
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: '#33691E',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#33691E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});