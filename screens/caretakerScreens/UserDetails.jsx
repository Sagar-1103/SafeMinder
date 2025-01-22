import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import ModalComponent from '../../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const UserDetails = ({navigation}) => {
  const [tempUserName, setTempUserName] = useState('');
  const [tempUserEmail, setTempUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userDob, setUserDob] = useState('');
  const [userphno, setUserphno] = useState(); 
  const [tempcaretakerPhNo, setTempcaretakerPhNo] = useState(); 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState({
      title: '',
      description: '',
      showBtn:false
    });

  const {setCaretaker,setUser,caretaker,setIsAssigned} = useLogin();

  const handleSubmit = async () => {
    try {
      if (!tempUserName.trim() || !tempUserEmail.trim() || !userGender.trim() || !userDob.trim() || !userphno.trim() || !tempcaretakerPhNo.trim()) {
        setModalMessage({
          title: 'Incomplete Information',
          description: 'Please ensure all fields are filled in correctly before proceeding.',
        });
        setModalVisible(true);
         return;
      }

      let id = uuid.v4();
      id = id.slice(0, 6);
      
      const userDetails = {
        id:id,
        name: tempUserName,
        email: tempUserEmail,
        gender: userGender,
        dob: userDob,
        number: userphno,
      };
  
      const caretakerDetails = {
        id:id,
        number: tempcaretakerPhNo,
      };
      setUser(userDetails);
      setCaretaker(caretakerDetails);
      setIsAssigned(true);
      
    const res1 = await firestore().collection('Caretakers').doc(id).set({...caretaker,...caretakerDetails});
    const res2 = await firestore().collection('Users').doc(id).set(userDetails);

    await AsyncStorage.setItem('user', JSON.stringify(userDetails));
    await AsyncStorage.setItem('caretaker', JSON.stringify(caretakerDetails));
    await AsyncStorage.setItem('isAssigned', "true");
      
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <>
    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} title={modalMessage.title} description={modalMessage.description} showBtn={modalMessage.showBtn} />
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backContainer}>
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
          placeholder="Enter user name"
          value={tempUserName}
          onChangeText={(text) => setTempUserName(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter user email"
          value={tempUserEmail}
          onChangeText={(text) => setTempUserEmail(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter user gender"
          value={userGender}
          onChangeText={(text) => setUserGender(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter user D.O.B"
          value={userDob}
          onChangeText={(text) => setUserDob(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your phone number"
          value={tempcaretakerPhNo}
          onChangeText={(text) => setTempcaretakerPhNo(text)}
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

      <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Continue</Text>
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
});

export default UserDetails;