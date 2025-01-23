import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart'

const series = [
  {value: 4000, color: rgb(229, 86, 25)},
  {value: 2000, color: rgb(239, 170, 141)}
]

const StepsBlock = ({ steps, distance, calories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps</Text>
      <View style={styles.innerContainer}>
        <PieChart widthAndHeight={'45%'} series={series} cover={0.45} />
        <View>
          <Text style={styles.detail}>Number of Steps: </Text>
          <Text style={styles.detailValue}>{steps || '0'}</Text>
          <Text style={styles.detail}>Distance: </Text>
          <Text style={styles.detailValue}>{distance || '0 km'}</Text>
          <Text style={styles.detail}>Calories Burned: </Text>
          <Text style={styles.detailValue}>{calories || '0 kcal'}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: '5%', // Padding as a percentage of the screen
    paddingBottom: '0%',
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
    width: '45%', // Icon width relative to parent container
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Force square aspect ratio
    marginRight: '4%',
  },
  detail: {
    fontSize: width * 0.035, // Font size as a percentage of screen width
    color: '#666',
    // marginBottom: '1%',
  },
  detailValue: {
    fontSize: width * 0.045, // Font size as a percentage of screen width
    color: 'rgb(229, 86, 25)',
    fontWeight: '600',
    marginBottom: '6%',
    marginLeft: '6%',
  },
});

export default StepsBlock;
