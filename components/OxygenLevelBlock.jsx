import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const OxygenLevelBlock = ({ oxygenLevel, chartData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oxygen</Text>
      <View style={styles.innerContainer}>
        {/* <Image source={require('../assets/lock.png')} style={styles.icon} /> */}
        <View style={styles.innerContainer}>
          <Text style={styles.detail}>
            Blood Oxygen Level :
          </Text>
          <Text style={styles.oxygenLevel}>
            {oxygenLevel || '---'}
          </Text>
        </View>
      </View>
      <View style={styles.chart}>
        <Text style={styles.chartPlaceholder}>
          (Chart Placeholder - Connect Chart Component Here)
        </Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: '4%', // Padding as a percentage of the screen
    borderRadius: 12,
    borderWidth: 0.5,
    elevation: 20,
    marginBottom: '4%',
    width: '90%', // Width relative to the screen size
    alignSelf: 'center', // Center the block
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: '7%',
    color: '#000000'
  },
  innerContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginLeft: '3%',
    marginBottom: '4%',
  },
  detail: {
    fontSize: width * 0.04, // Font size as a percentage of screen width
    color: '#666',
    // marginBottom: '1%',
  },
  icon: {
    width: '20%',
    height: undefined,
    aspectRatio: 1,
    marginRight: '7%',
  },
  oxygenLevel: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  percentage: {
    fontSize: width * 0.035,
    color: '#666',
  },
  chart: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholder: {
    color: '#888',
    fontSize: width * 0.035,
  },
});

export default OxygenLevelBlock;
