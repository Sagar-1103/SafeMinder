import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const UserDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [userphno, setUserphno] = useState(); 
  const [phno, setPhno] = useState(); 


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}>
        <View>
          <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
        </View>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        
        <Text style={styles.title}>User Details</Text>
        {/* <Image source={require('../../assets/backButton.png')} style={styles.backButtonNull} /> */}
      </View>
      

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/User-Outline.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your gender"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your D.O.B"
          value={dob}
          onChangeText={(text) => setDob(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your phone number"
          value={phno}
          onChangeText={(text) => setPhno(text)}
        />
      </View>      

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter user phone number"
          placeholderTextColor="#888"
          value={userphno}
          onChangeText={(text) => setUserphno(text)}
        />
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
    paddingHorizontal: '10%', // Use percentage padding
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 32, // Use percentage font size
    color: '#000000',
    textAlign: 'center',
    
    fontWeight: 'bold',
  },
  backContainer: {
    height: '10%',
    top: '7%',
    width: '50%',
    // right: '80%'
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '9%', // Use percentage margin
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '1.2%',
    paddingHorizontal: '5%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8%', // Use percentage margin
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '1.2%',
    paddingHorizontal: '5%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-8%',
    marginBottom: '15%'
  },
  input: {
    flex: 1,
    marginLeft: '3%',
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: '10%', // Use percentage width
    height: '60%', // Use percentage height
    marginHorizontal: '4%',
  },
  backButton: {
    width: '25%', // Use percentage width
    height: '60%', // Use percentage height
    marginLeft: '-6%',
    marginTop: '2.5%'
  },
  backButtonNull: {
    width: '10%', // Use percentage width
    height: '50%', // Use percentage height
    opacity: 0
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
  signUpText: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: '3%', // Use percentage margin
    color: 'rgb(55, 53, 53)',
    fontWeight: '400'
  },
  signUpLinkText: {
    color: 'rgb(233,108,56)',
    fontWeight: '600'
  },
});

export default UserDetails;