import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import StepsBlock from '../../components/StepsBlock';
import HeartRateBlock from '../../components/HeartRateBlock';
import OxygenLevelBlock from '../../components/OxygenLevelBlock';

const ReportsPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StepsBlock steps={0} distance="0 km" calories="0 kcal" />
      <HeartRateBlock heartRate={150} />
      <OxygenLevelBlock oxygenLevel="98/100" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  }
});

export default ReportsPage;
