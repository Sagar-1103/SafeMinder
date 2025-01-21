import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const SignIn = () => {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
              <Image source={require('../../assets/backButton.png')} style={styles.backButtonNull} />
              <Text style={styles.skip}>skip</Text>
            </View>
      
      <Text style={styles.InnerText}>Ask your caretaker to provide pairing code</Text>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your pairing code"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%', // Use percentage padding
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  skip: {
    fontSize: 12, // Use percentage font size
    textAlign: 'center',
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8%', // Use percentage margin
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 10,
    paddingVertical: '1.2%',
    paddingHorizontal: '5%',
  },
  input: {
    flex: 1,
    marginLeft: '3%',
    color: '#888',
    fontSize: 17,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: '10%',
    marginBottom: '15%'
  },
  backButton: {
    width: '10%', // Use percentage width
    height: '50%', // Use percentage height
    marginLeft: '-5%'
  },
  backButtonNull: {
    width: '10%', // Use percentage width
    height: '50%', // Use percentage height
    opacity: 0
  },
  inputIcon: {
    width: '10%', // Use percentage width
    height: '60%', // Use percentage height
    marginHorizontal: '4%',
  },
  signInButton: {
    width: '100%',
    backgroundColor: 'rgb(233,108,56)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 30,
    marginTop: '4%', // Use percentage margin
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  InnerText: {
    marginTop: '12%',
    marginBottom: '22%',
    // width: '80%',
    fontSize: 22,
    textAlign: 'center',
    color: 'rgb(73, 70, 70)',
  },
});

export default SignIn;