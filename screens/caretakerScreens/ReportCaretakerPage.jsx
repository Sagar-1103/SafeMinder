import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import StepsBlock from '../../components/StepsBlock';
import HeartRateBlock from '../../components/HeartRateBlock';
import OxygenLevelBlock from '../../components/OxygenLevelBlock';
import firestore from '@react-native-firebase/firestore';
import { useLogin } from '../../context/LoginProvider';

const ReportsPage = () => {
  const [stepsData, setStepsData] = useState({ steps: 0, distance: '0 km', calories: '0 kcal' });
  const {caretaker} = useLogin();

  useEffect(() => {
    fetchStepsData();
  }, []);

  const fetchStepsData = async () => {
    try {
      const res1 = await firestore().collection('Reports').doc(caretaker?.id).get();
      setStepsData({
        steps: res1._data.steps,
        distance:res1._data.distance,
        calories:res1._data.calories,
      });

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
