import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Charts from './Charts';

const OxygenLevelBlock = ({ oxygenLevel }) => {
  const chartData = {
    labels: ['00', '04', '08', '12', '16', '20', '24', '28'],
    datasets: [{ data: [95, 95, 93, 94, 93, 93, 92, 95] }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`, // Green color
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oxygen Level</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.detail}>Blood Oxygen Level:</Text>
      </View>
      <Text style={styles.oxygenLevel}>{oxygenLevel || '---'}</Text>
      <View style={styles.chartBox}>
        <Charts chartData={chartData} chartConfig={chartConfig} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: '4%',
    marginBottom: '5%',
    borderRadius: 12,
    borderWidth: 0.5,
    elevation: 20,
    marginBottom: '4%',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: '7%',
    color: '#000',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
    paddingHorizontal: '2%',
  },
  detail: {
    fontSize: width * 0.045,
    color: '#666',
  },
  oxygenLevel: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '13%',
    color: '#4caf50',
  },
  percentage: {
    fontSize: width * 0.045,
    color: '#666',
  },
  chartBox: {
    height: 190, // Set an appropriate height for the chart
    width: '100%',
    // backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
  },
});

export default OxygenLevelBlock;
