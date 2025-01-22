import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {useLogin} from '../../context/LoginProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';


const CaretakerSignIn = ({navigation}) => {
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const {setLoggedIn, setRole, setCaretaker,setUser,setProcess,setIsAssigned} = useLogin();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn: false,
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

  const handleSubmit = async () => {    
    try {
      if (!email.trim() || !tempPassword.trim()) {
        setModalMessage({
          title: 'Incomplete Information',
          description:
            'Please ensure all fields are filled in correctly before proceeding.',
        });
        setModalVisible(true);  
        return;
      }
      const user = await auth().signInWithEmailAndPassword(tempEmail, tempPassword);
      const {displayName, email} = user.user;
      const details = {name: displayName, email: email, gender: '', number: ''};
      console.log(details);
      setCaretaker(details);
      await AsyncStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
      await AsyncStorage.setItem('role', 'caretaker');
      setRole('caretaker');
      console.log('Logged In');
    } catch (error) {
      console.error(error);
    }
  };

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
            <View style={styles.buttonGroup}>
              {modalMessage.showBtn && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleLimitExceeded}>
                  <Text style={styles.closeButtonText}>Login</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
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
              
              <Text style={styles.title}>Sign In</Text>
              {/* <Image source={require('../../assets/backButton.png')} style={styles.backButtonNull} /> */}
            </View>

        <View style={styles.emailInputContainer}>
          <Image
            source={require('../../assets/sms.png')}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Enter your email"
            value={tempEmail}
            onChangeText={(text) => setTempEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/lock.png')}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry
            value={tempPassword}
            onChangeText={text => setTempPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate('CaretakerSignUp')}
          style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLinkText}>Sign up</Text>
        </Text>

        <Text style={styles.orText}>
          ------------------------------ OR -------------------------------
        </Text>

        <TouchableOpacity
          onPress={() =>
            handleGoogleSignIn().then(() =>
              console.log('Signed in with Google!'),
            )
          }
          style={styles.googleButton}>
          <Image
            source={require('../../assets/googleLogo.png')}
            style={styles.googleIcon}
          />
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
  backContainer: {
    height: '10%',
    top: '7%',
    width: '50%',
    // right: '80%'
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: '-5%',
    marginBottom: '15%'
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
    fontWeight: '400',
  },
  signUpLinkText: {
    color: 'rgb(233,108,56)',
    fontWeight: '600',
  },
  orText: {
    marginTop: '18%', // Use percentage margin
    marginBottom: '15%', // Use percentage margin
    textAlign: 'center',
    color: 'rgb(204, 201, 201)',
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
    fontWeight: '700',
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
  buttonGroup: {
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
    marginHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CaretakerSignIn;
