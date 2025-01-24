import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Charts from './Charts';

const HeartRateBlock = () => {
  const [avg,setAvg] = useState(0);
  const chartData = {
    labels: ['00', '04', '08', '12', '16', '20', '24', '28'],
    datasets: [{ data: [72, 85, 90, 100, 78, 85, 92, 110, 80] }],
  };

  const calculateAverageBPM = (data) => {
    if (!data || data.length === 0) {
      return 0; // Return 0 if data is empty or undefined
    }
    const total = data.reduce((sum, bpm) => sum + bpm, 0); // Sum all BPM values
    return Math.round(total / data.length); // Calculate and round the average
  };

  useEffect(()=>{
    const val = calculateAverageBPM(chartData.datasets[0].data);
    setAvg(val);
  },[]);

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`, // Orange color
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate</Text>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/lock.png')} style={styles.icon} />
        <View>
          <Text style={styles.heartRate}>
            {avg || '---'}
            <View style={styles.bpmView}>
              <Text style={styles.bpm}>{"  "}BPM</Text>
            </View>
          </Text>
        </View>
      </View>
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
    padding: '4%', // Padding as a percentage of the screen
    // paddingBottom: '1%', // Padding as a percentage of the screen
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
    marginBottom: '18%',
  },
  icon: {
    width: '15%',
    height: undefined,
    aspectRatio: 1,
    marginRight: '4%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  heartRate: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#f55',
  },
  chartBox: {
    height:'30%',
    width: '100%',
    marginBottom: '-20%'
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
    borderRadius: 50,
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250, // Adjust the height as necessary
    width: '100%', // Ensure it takes full width of the container
  },
  chartPlaceholder: {
    color: '#888',
    fontSize: width * 0.04,
  },
});

export default HeartRateBlock;