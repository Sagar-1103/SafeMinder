import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  initialize,
  getGrantedPermissions,
  readRecords,
} from 'react-native-health-connect';

const FitComponent = () => {
  const [totalWeight, setTotalWeight] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);

  const initializeHealthConnect = async () => {
    const isInitialized = await initialize();
    console.log({isInitialized});
  };

  useEffect(() => {
    initializeHealthConnect();
  }, []);

  const readGrantedPermissions = () => {
    getGrantedPermissions().then(permissions => {
      console.log('Granted permissions ', {permissions});
    });
  };

  const getTotalSteps = async () => {
    try {
      const {records} = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2025-01-20T00:00:00.000Z',
          endTime: '2025-01-21T23:59:59.999Z', 
        },
      });

      const totalSteps = records.reduce((total, record) => total + record.count,0);
      setTotalSteps(totalSteps);

      console.log(`Total steps from January 20, 2025, to January 21, 2025: ${totalSteps}`);
    } catch (error) {
      console.error('Error reading steps data:', error);
    }
  };

  const getTotalWeight = async () => {
    try {
      const {records} = await readRecords('Weight', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2025-01-20T00:00:00.000Z',
          endTime: '2025-01-21T23:59:59.999Z',
        },
      });

      const totalWeight = records.reduce((total, record) => total + record.weight.inKilograms,0);
      const averageWeight = totalWeight / records.length;
      setTotalWeight(averageWeight.toFixed(2));
      console.log(`Average weight: ${averageWeight.toFixed(2)} kg`);
    } catch (error) {
      console.error('Error reading weight data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={readGrantedPermissions} style={styles.button}>
          <Text style={styles.buttonText}>Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getTotalWeight} style={styles.button}>
          <Text style={styles.buttonText}>Get Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getTotalSteps} style={styles.button}>
          <Text style={styles.buttonText}>Get Steps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        {totalWeight !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>
              Total Weight: {totalWeight} kg
            </Text>
          </View>
        )}
        {totalSteps !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Total Steps: {totalSteps}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 30,
    alignItems: 'center',
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
