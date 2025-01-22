import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Onboarding1 = () => {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
              <Image source={require('../../assets/backButton.png')} style={styles.backButtonNull} />
              <Text style={styles.skip}>Skip</Text>
            </View>
      
            <Image
              source={require('../../assets/Onboarding1.png')} 
              style={styles.centerImg}
            />
            <View style={styles.footerContainer}>    
            <Text style={styles.footer}  >Be their go to companion.</Text>
            </View>
            <View style={styles.onboardNav}>
            <Image source={require('../../assets/OnboardingMarker1.png')}/>
            <Image source={require('../../assets/nextButton.png')} />
            </View>

            
        <View>

        </View>


      
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
  footer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '37%',
    color: '#000000',
    fontFamily: 'Poppins',
    textAlign: 'left',
    width: '50%'
  },
  skip: {
    fontSize: 16, // Use percentage font size
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
  centerImg: {
    width: '110%',
    height: undefined,
    aspectRatio: 0.98,
    marginTop: '30%'
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
  footerContainer: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: '10%',
    marginBottom: '15%',
  },
  onboardNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  nextButtonImg: {
    height: '45%',
    width: '75%',
    flex:1
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
  InnerText: {
    marginTop: '12%',
    marginBottom: '22%',
    // width: '80%',
    fontSize: 22,
    textAlign: 'center',
    color: 'rgb(73, 70, 70)',
  },
});

export default Onboarding1;