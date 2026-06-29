import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import config from './config.json';
import { getDBConnection, createTables, seedBUKDatabase } from './src/database';
import SessionEnforcer from './src/components/SessionEnforcer';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

const EXPECTED_CAMPUS_CODE = 'CAM-SA-07';
const EXPECTED_API_PATH = '/api/v3/sa/';

export default function App() {
  const [isConfigValid, setIsConfigValid] = useState<boolean | null>(null);
  const [isDbReady, setIsDbReady] = useState<boolean>(false);

  useEffect(() => {
    if (
      config.campusCode !== EXPECTED_CAMPUS_CODE ||
      config.apiBasePath !== EXPECTED_API_PATH
    ) {
      setIsConfigValid(false);
      return; 
    } else {
      setIsConfigValid(true);
    }

    const initDB = async () => {
      try {
        const db = await getDBConnection();
        await createTables(db);
        await seedBUKDatabase(db);
        setIsDbReady(true);
      } catch (error) {
        console.error("Database initialization failed:", error);
      }
    };

    initDB();
  }, []);

  if (isConfigValid === false) {
    throw new Error("FATAL ERROR: Campus Code or API Version Mismatch. Unauthorized Build.");
  }

  
  if (isConfigValid === null || !isDbReady) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#33691E" />
        <Text style={styles.loadingText}>Initializing Group 7 Data</Text>
      </SafeAreaView>
    );
  }

  return (
    <Provider store={store}>
      <SessionEnforcer>
        <AppNavigator />
      </SessionEnforcer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF' 
  },
  loadingText: { 
    marginTop: 15, 
    fontSize: 16, 
    color: '#333333',
    fontWeight: '500'
  }
});