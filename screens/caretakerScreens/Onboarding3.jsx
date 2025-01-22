import React from 'react';
import {  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image, } from 'react-native';

const Onboarding3 = ({navigation}) => {

  const handleNavigate = (screen)=>{
    navigation.navigate(screen)
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/safeMinderLogo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.subtitle}>Login to Track and Remind</Text>
      <TouchableOpacity onPress={()=>handleNavigate("CaretakerSignIn")} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleNavigate("CaretakerSignUp")} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%', // Use percentage padding
    alignItems: 'center',
    
  },
  logo: {
    width: '65.8%',
    height: undefined,
    aspectRatio: 1.05,
    marginTop: '50%'
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  signUpButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 19,
    color: 'rgb(233,108,56)',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: '7%',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: '7%',
    fontFamily: 'Poppins',
  },
  signInButton: {
    width: '90%',
    backgroundColor: 'rgb(233,108,56)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 32,
    marginTop: '4%', // Use percentage margin
  },
  signUpButton: {
    width: '90%',
    backgroundColor: 'rgb(247, 247, 247)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgb(233,108,56)',
    marginTop: '4%', // Use percentage margin
  },
});

export default Onboarding3;