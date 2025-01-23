import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const HeartRateBlock = ({ heartRate, chartData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate</Text>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/lock.png')} style={styles.icon} />
        <View>
          <Text style={styles.heartRate}>
            {heartRate || '---'} 
            <View style={styles.bpmView}><Text style={styles.bpm}>BPM</Text></View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '9%',
  },
  icon: {
    width: '20%',
    height: undefined,
    aspectRatio: 1,
    marginRight: '4%',
  },
  heartRate: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#f55',
  },
  bpm: {
    fontSize: width * 0.035,
    color: '#666',
    fontWeight: '600',
    // marginLeftleft: '5%',
  },
  bpmView: {
    paddingLeft: '5%',
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

export default HeartRateBlock;
