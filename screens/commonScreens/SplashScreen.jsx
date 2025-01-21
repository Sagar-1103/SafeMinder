import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/safeMinder_logo.jpg')} 
        style={styles.logo}
      />
      <Text style={styles.text}>safeMinder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: '44.8%',
    height: '20%',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
});

export default SplashScreen;