import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import StepsBlock from '../../components/StepsBlock';
import HeartRateBlock from '../../components/HeartRateBlock';
import OxygenLevelBlock from '../../components/OxygenLevelBlock';

const ReportsPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StepsBlock steps={100} distance="0" calories="0" goals={1000} />
      <HeartRateBlock heartRate={150} />
      <OxygenLevelBlock oxygenLevel="98/100" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    backgroundColor: '#f9f9f9',
    paddingBottom: '50%', // Add extra padding at the bottom
  },
});

export default ReportsPage;
