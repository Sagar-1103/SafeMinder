import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const CaretakerSignUp = ({navigation}) => {
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempCurrPassword, setTempCurrPassword] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const {setLoggedIn, setRole, setCaretaker,setUserHomeLocation,setUser,setProcess,setIsAssigned} = useLogin();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn:false
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult = await GoogleSignin.signIn();
      idToken = signInResult.data?.idToken;
      if (!idToken) {
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data.idToken,
      );
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const {displayName, email, photoURL, uid} = userCredential.user;
      console.log('User Details:', {displayName, email, photoURL, uid});

      const caretakerQuery = await firestore()
      .collection('Caretakers')
      .where('email', '==', email)
      .get();

      if (!caretakerQuery.empty) {
        const caretakerData = caretakerQuery.docs[0].data();
        let userData = await firestore().collection('Users').doc(caretakerData.id).get();
        userData = userData._data;
        await AsyncStorage.setItem('user',JSON.stringify(userData));
        setUser(userData);
        await AsyncStorage.setItem('process','true');
        setProcess(true);
        await AsyncStorage.setItem('isAssigned','true');
        setIsAssigned(true);
        await AsyncStorage.setItem('role', 'caretaker');
        setRole('caretaker');
        await AsyncStorage.setItem('loggedIn', 'true');
        setLoggedIn(true);
        await AsyncStorage.setItem('caretaker', JSON.stringify(caretakerData));
        setCaretaker(caretakerData);
        await AsyncStorage.setItem('userHomeLocation', JSON.stringify(caretakerData?.userHomeCoordinates));
        setUserHomeLocation(caretakerData?.userHomeCoordinates);
        
      }
      else {
      const details = {name: displayName, email: email, gender: '', number: ''};
      setCaretaker(details);
      await AsyncStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
      await AsyncStorage.setItem('role', 'caretaker');
      setRole('caretaker');
      await AsyncStorage.setItem('caretaker', JSON.stringify(details));
      console.log('Registered Caretaker');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async()=>{
    try {
      if(!tempEmail.trim() || !tempPassword.trim() || !tempName.trim() || !tempCurrPassword.trim() ){
        setModalMessage({
          title: 'Incomplete Information',
          description: 'Please ensure all fields are filled in correctly before proceeding.',
        });
        setModalVisible(true);
         return;
      }
      if (tempPassword!==tempCurrPassword) {
        setModalMessage({
          title: 'Password Mismatch',
          description: 'The password and confirm password fields do not match. Please re-enter them.',
        });
        setModalVisible(true);
        setTempCurrPassword('');
        setTempPassword('');
        return;
      }

      console.log(tempName,tempEmail,tempCurrPassword,tempPassword);
      await auth().createUserWithEmailAndPassword(tempEmail,tempPassword);

      const details = {tempName,tempEmail,gender:"",number:""}
      setCaretaker(details);
      await AsyncStorage.setItem('loggedIn', "true");
      setLoggedIn(true);
      await AsyncStorage.setItem('role', "caretaker");
      setRole("caretaker");
      await AsyncStorage.setItem('caretaker', JSON.stringify(details));
      console.log("Registered Caretaker");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  }

  return (
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalMessage.title}</Text>
            <Text style={styles.modalDescription}>
              {modalMessage.description}
            </Text>
            <View
              style={styles.buttonGroup}>
              {modalMessage.showBtn && <TouchableOpacity
                style={styles.closeButton}
                onPress={handleLimitExceeded}>
                <Text style={styles.closeButtonText}>Login</Text>
              </TouchableOpacity>}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={()=>setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backContainer}>
                    <View>
                      <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.headerContainer}>
        
        <Text style={styles.title}>Sign Up</Text>
        {/* <Image source={require('../../assets/backButton.png')} style={styles.backButtonNull} /> */}
      </View>
      

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/User-Outline.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your name"
          value={tempName}
          onChangeText={(text) => setTempName(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your email"
          value={tempEmail}
          onChangeText={(text) => setTempEmail(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={tempPassword}
          onChangeText={(text) => setTempPassword(text)}
        />
          <Image
            source={require('../../assets/eye-slash.png')}
            style={styles.passIcon}
          />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={tempCurrPassword}
          onChangeText={(text) => setTempCurrPassword(text)}
        />
        <Image source={require('../../assets/eye-slash.png')} style={styles.passIcon} />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text onPress={()=>navigation.navigate("CaretakerSignIn")} style={styles.signUpText}>Already have an account? <Text style={styles.signUpLinkText}>Sign in</Text></Text>

      <Text style={styles.orText}>------------------------------ OR -------------------------------</Text>

      <TouchableOpacity  onPress={() => handleGoogleSignIn().then(() => console.log('Signed in with Google!'))} style={styles.googleButton}>
        <Image source={require('../../assets/googleLogo.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
    </>
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
  orText: {
    marginTop: '12%', // Use percentage margin
    marginBottom: '12%', // Use percentage margin
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
  },
  modalDescription: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    width: 250,
  },
  buttonGroup : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'rgb(233,108,56)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal:20
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CaretakerSignUp;





