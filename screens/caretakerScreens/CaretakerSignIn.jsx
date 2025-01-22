import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const CaretakerSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}>
              <View>
                <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
              </View>
            </TouchableOpacity>
            <View style={styles.headerContainer}>
              
              <Text style={styles.title}>Sign In</Text>
              {/* <Image source={require('../../assets/backButton.png')} style={styles.backButtonNull} /> */}
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

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLinkText}>Sign up</Text></Text>

      <Text style={styles.orText}>------------------------------      OR       -------------------------------</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/googleLogo.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
    fontWeight: 'bold', // Use percentage margin
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
  backContainer: {
    height: '10%',
    top: '7%',
    width: '50%',
    // right: '80%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%', // Use percentage margin
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '1.2%',
    paddingHorizontal: '5%',
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
  forgotPasswordButton: {
    alignSelf: 'flex-end', // Align to the right
  },
  forgotPasswordText: {
    color: 'rgb(220, 115, 67)',
    fontWeight: '500',
    fontSize: 15,
    marginBottom: '10%',
  },
  signInButton: {
    backgroundColor: 'rgb(233,108,56)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 32,
    marginTop: '4%', // Use percentage margin
  },
  backButton: {
    width: '20%', // Use percentage width
    height: '60%', // Use percentage height
    marginLeft: '-5%',
    marginTop: '7.5%',
  },
  backButtonNull: {
    width: '10%', // Use percentage width
    height: '50%', // Use percentage height
    opacity: 0
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: '-5%',
    marginBottom: '15%'
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
  orText: {
    marginTop: '18%', // Use percentage margin
    marginBottom: '15%', // Use percentage margin
    textAlign: 'center',
    color: 'rgb(204, 201, 201)'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 13,
    padding: '5%', // Use percentage padding
    paddingHorizontal: '8%',
  },
  googleIcon: {
    width: '9.5%', // Use percentage width
    height: '100%', // Use percentage height
    marginRight: '12%',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 19,
    fontWeight: '700'
  },
});

export default CaretakerSignIn;