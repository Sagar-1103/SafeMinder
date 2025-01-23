import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  initialize,
  getGrantedPermissions,
  readRecords,
  writeRecords,
  requestPermission,
} from 'react-native-health-connect';

const FitComponent = () => {
  const [totalWeight, setTotalWeight] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);
  const [dummyInserted, setDummyInserted] = useState(false);

  // Initialize Health Connect
  const initializeHealthConnect = async () => {
    const isInitialized = await initialize();
    console.log({ isInitialized });
  };

  // Request Permissions
  const requestWritePermissions = async () => {
    try {
      const permissions = [
        {
          accessType: 'write',
          dataType: 'HeartRate',
        },
        {
          accessType: 'read',
          dataType: 'Steps',
        },
        {
          accessType: 'read',
          dataType: 'Weight',
        },
      ];
      const result = await requestPermission(permissions);
      console.log('Permissions granted:', result);
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  // Read Steps
  const getTotalSteps = async () => {
    try {
      const { records } = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2025-01-20T00:00:00.000Z',
          endTime: '2025-01-21T23:59:59.999Z',
        },
      });

      const totalSteps = records.reduce(
        (total, record) => total + record.count,
        0
      );
      setTotalSteps(totalSteps);

      console.log(
        `Total steps from January 20, 2025, to January 21, 2025: ${totalSteps}`
      );
    } catch (error) {
      console.error('Error reading steps data:', error);
    }
  };

  // Read Weight
  const getTotalWeight = async () => {
    try {
      const { records } = await readRecords('Weight', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2025-01-20T00:00:00.000Z',
          endTime: '2025-01-21T23:59:59.999Z',
        },
      });

      const totalWeight = records.reduce(
        (total, record) => total + record.weight.inKilograms,
        0
      );
      const averageWeight = totalWeight / records.length;
      setTotalWeight(averageWeight.toFixed(2));
      console.log(`Average weight: ${averageWeight.toFixed(2)} kg`);
    } catch (error) {
      console.error('Error reading weight data:', error);
    }
  };

  // Insert Dummy Heart Rate Data
  const insertDummyHeartRateData = async () => {
    try {
      const dummyHeartRateRecords = [
        { time: '2025-01-20T10:00:00.000Z', bpm: 75 },
        { time: '2025-01-20T15:00:00.000Z', bpm: 80 },
        { time: '2025-01-21T09:30:00.000Z', bpm: 72 },
        { time: '2025-01-21T14:45:00.000Z', bpm: 78 },
        { time: '2025-01-22T08:00:00.000Z', bpm: 85 },
        { time: '2025-01-22T20:00:00.000Z', bpm: 88 },
      ];

      await writeRecords('HeartRate', dummyHeartRateRecords);
      setDummyInserted(true);
      console.log('Dummy heart rate data successfully inserted.');
    } catch (error) {
      console.error('Error inserting dummy heart rate data:', error);
    }
  };

  useEffect(() => {
    initializeHealthConnect();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={requestWritePermissions}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Request Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getTotalWeight} style={styles.button}>
        <Text style={styles.buttonText}>Get Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getTotalSteps} style={styles.button}>
        <Text style={styles.buttonText}>Get Steps</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={insertDummyHeartRateData} style={styles.button}>
        <Text style={styles.buttonText}>Insert Dummy Heart Rate</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        {totalWeight !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>
              Average Weight: {totalWeight} kg
            </Text>
          </View>
        )}
        {totalSteps !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Total Steps: {totalSteps}</Text>
          </View>
        )}
        {dummyInserted && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Dummy Heart Rate Data Inserted</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'powderblue',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultCard: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  resultText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FitComponent;
