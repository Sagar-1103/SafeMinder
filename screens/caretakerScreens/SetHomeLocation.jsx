import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const SetHomeLocation = () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}>
        <View>
          <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
        </View>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Set Home Location</Text>
      </View>
      

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/User-Outline.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Search"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.mapContainer}>
        <Image source={require('../../assets/User-Outline.png')} style={styles.mapBox}/>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Continue</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '12%', // Use percentage padding
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 28, // Use percentage font size
    color: '#000000',
    textAlign: 'center',
    top: '3.5%',
    left: '20%',
    fontWeight: 'bold',
  },
  backContainer: {
    height: '8%',
    top: '7%',
    width: '50%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%', // Use percentage margin
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '0.2%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-8%',
    marginBottom: '15%'
  },
  mapContainer: {
    height: '60%',
    width: '100%',
    backgroundColor: '#888',
    borderRadius: 22,
  },
  mapBox: {
    height: '80%',
    width:'100%',
  },
  input: {
    flex: 1,
    // marginLeft: '3%',
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: '10%', // Use percentage width
    height: '60%', // Use percentage height
    marginHorizontal: '4%',
  },
  backButton: {
    width: '20%', // Use percentage width
    height: '60%', // Use percentage height
    marginLeft: '-6%',
    marginTop: '1%'
  },
  passIcon: {
    width: '10%', 
    height: '50%',
  },
  signInButton: {
    backgroundColor: 'rgb(233,108,56)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 32,
    marginTop: '4%', // Use percentage margin
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  }, 
});

export default SetHomeLocation;