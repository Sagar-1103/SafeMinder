import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoleScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/safeMinder_logo.jpg')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Choose Role</Text>

      <TouchableOpacity style={styles.button}>
        {/* Image for Senior Citizen */}
        <Text style={styles.buttonText}>Senior Citizen</Text>
      </TouchableOpacity>
      <Text style={styles.roleText}>Senior Citizen</Text>

      <TouchableOpacity style={styles.button}>
        {/* Image for Care Taker */}
        <Text style={styles.buttonText}>Care Taker</Text>
      </TouchableOpacity>
      <Text style={styles.roleText}>Care Taker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: '30%',
    height: '12%',
    resizeMode: 'contain',
    marginBottom: '4%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '15%',
    color: '#000000'
  },
  button: {
    width: '50%',
    height: '25%',
    backgroundColor: '#123456',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%', 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '7%', 
    color: '#000000'
  },
});

export default RoleScreen;