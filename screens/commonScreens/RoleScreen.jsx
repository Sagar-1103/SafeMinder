import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SafeMinderLogo from '../../assets/safeMinderLogoOnly.png';
import UserSelectionProfile from '../../assets/UserSelectionProfile.png';
import CareTakerSelectionProfile from '../../assets/CareTakerSelectionProfile.png';

const RoleScreen = ({navigation}) => {
  const handleSubmit = (temp)=>{
    navigation.navigate(temp==="user"?"UserSignIn":"CaretakerSignIn");
  }
  return (
    <View style={styles.container}>
      <Image
        source={SafeMinderLogo}
        style={styles.logo}
      />
      <Text style={styles.title}>Choose Role</Text>
        
      <LinearGradient
        colors={['rgb(91,88,166)', 'rgb(45,54,144)', 'rgb(73,68,115)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <TouchableOpacity onPress={()=>handleSubmit("user")}>
          <Image
            source={UserSelectionProfile}
            style={styles.buttonImg}
          />
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.roleText}>Senior Citizen</Text>

      <LinearGradient
        colors={['rgb(91,88,166)', 'rgb(45,54,144)', 'rgb(73,68,115)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <TouchableOpacity onPress={()=>handleSubmit("caretaker")}>
          <Image
            source={CareTakerSelectionProfile}
            style={styles.careTakerImg}
          />
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.roleText}>CareTaker</Text>
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
    width: '25%',
    height: '12%',
    resizeMode: 'contain',
    marginBottom: '7%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '7%',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  button: {
    width: '50%',
    height: '25%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  roleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '7%',
    color: '#000000',
  },
  buttonImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.1,
    borderRadius: 25,
    marginTop: '11%',
  },
  careTakerImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.3,
    borderRadius: 25,
    marginTop: '25%',
  },
});

export default RoleScreen;
