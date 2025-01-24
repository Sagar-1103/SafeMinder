import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';

const StepsBlock = ({ steps, distance, calories, goals }) => {

const series = [
  { value: steps, color: '#F42' },
  { value: goals - steps, color: '#FAB' },
];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps</Text>
      <View style={styles.innerContainer}>
        <View style={styles.piechartContainer}>
          <PieChart widthAndHeight={140} series={series} cover={0.75} style={styles.piechart} />
          {/* Image and Text Overlay */}
          <View style={styles.overlayContent}>
            <Image source={require('../assets/sms.png')} style={styles.image} />
            <Text style={styles.centerText}>{`${steps}`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.detail}>Number of Steps: </Text>
          <Text style={styles.detailValue}>{steps || '0'}</Text>
          <Text style={styles.detail}>Distance: </Text>
          <Text style={styles.detailValue}>{distance || '0'}</Text>
          <Text style={styles.detail}>Calories Burned: </Text>
          <Text style={styles.detailValue}>{calories || '0'}</Text>
          <Text style={styles.detail}>Goal: </Text>
          <Text style={styles.detailValue}>{goals || '0'} Steps</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: '5%',
    paddingBottom: '0%',
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
    color: '#000000',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '9%',
  },
  piechartContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  piechart: {
    marginRight: '5%',
  },
  overlayContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%', // Adjust the size of the image
    height: '100%',
    marginRight: '15%'
    // borderRadius: 15, // For circular image
    // marginBottom: 5,
  },
  centerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginRight: '15%',
    color: '#000',
  },
  detail: {
    fontSize: width * 0.035,
    color: '#666',
  },
  detailValue: {
    fontSize: width * 0.045,
    color: 'rgb(229, 86, 25)',
    fontWeight: '600',
    marginBottom: '6%',
    marginLeft: '6%',
  },
});

export default StepsBlock;