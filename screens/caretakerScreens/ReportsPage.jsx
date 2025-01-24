import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import StepsBlock from '../../components/StepsBlock';
import HeartRateBlock from '../../components/HeartRateBlock';
import OxygenLevelBlock from '../../components/OxygenLevelBlock';
import {
  initialize,
  getGrantedPermissions,
  readRecords,
} from 'react-native-health-connect';
import firestore from '@react-native-firebase/firestore';
import { useLogin } from '../../context/LoginProvider';

const ReportsPage = () => {
  const [stepsData, setStepsData] = useState({ steps: 0, distance: '0 km', calories: '0 kcal' });
  const {code} = useLogin();

  useEffect(() => {
    const initializeHealthConnect = async () => {
      try {
        const isInitialized = await initialize();
        console.log('Health Connect initialized:', isInitialized);
        if (isInitialized) {
          const permissions = await getGrantedPermissions();
          console.log('Granted permissions:', permissions);
        } else {
          Alert.alert('Error', 'Failed to initialize Health Connect.');
        }
      } catch (error) {
        console.error('Health Connect initialization error:', error);
      }
    };

    initializeHealthConnect();
    fetchStepsData();
    const interval = setInterval(fetchStepsData, 5000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchStepsData = async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

      const { records } = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'between',
          startTime: todayStart, 
          endTime: now.toISOString(),
        },
      });

      const totalSteps = records.reduce((total, record) => total + record.count, 0);
      const totalDistance = records.reduce((total, record) => total + (record.distance?.inKilometers || 0), 0).toFixed(2);
      const totalCalories = records.reduce((total, record) => total + (record.caloriesBurned?.inKilocalories || 0), 0).toFixed(2);

      setStepsData({
        steps: totalSteps,
        distance: `${totalDistance} km`,
        calories: `${totalCalories} kcal`,
      });

      const res1 = await firestore().collection('Reports').doc(code).set({steps: totalSteps,distance:`${totalDistance} km`,calories:`${totalCalories} kcal`},{ merge: true });

      console.log('Real-time steps data:', { totalSteps, totalDistance, totalCalories });
    } catch (error) {
      console.error('Error reading real-time steps data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StepsBlock
        steps={stepsData.steps || 100}
        distance={stepsData.distance || "0"}
        calories={stepsData.calories || "0"}
        goals={stepsData.steps*5 || 10000} 
        // steps={100} distance="0" calories="0" goals={1000} 
      />
      <HeartRateBlock />
      <OxygenLevelBlock />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    backgroundColor: '#f9f9f9',
    paddingBottom: '50%',
  },
});

export default ReportsPage;
