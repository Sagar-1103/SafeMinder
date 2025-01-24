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
import { SelectList } from 'react-native-dropdown-select-list';

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

  const {setCaretaker,setUser,caretaker,setIsAssigned,setCode} = useLogin();

  const genderOptions = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Other' },
  ];

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
        fallDetected:false,
        boundStatus:false
      };
  
      const caretakerDetails = {
        id:id,
        number: tempcaretakerPhNo,
      };
      setUser(userDetails);
      setCaretaker(caretakerDetails);
      setIsAssigned(true);
      setCode(id);
      
    const res1 = await firestore().collection('Caretakers').doc(id).set({...caretaker,...caretakerDetails});
    const res2 = await firestore().collection('Users').doc(id).set(userDetails);

    await AsyncStorage.setItem('user', JSON.stringify(userDetails));
    await AsyncStorage.setItem('caretaker', JSON.stringify(caretakerDetails));
    await AsyncStorage.setItem('isAssigned', "true");
    await AsyncStorage.setItem('code',id);
      
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <>
    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} title={modalMessage.title} description={modalMessage.description} showBtn={modalMessage.showBtn} />
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer}>
        <View>
          {/* <Image source={require('../../assets/backButton.png')} style={styles.backButton} /> */}
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
          keyboardType='email-address'
          value={tempUserEmail}
          onChangeText={(text) => setTempUserEmail(text)}
        />
      </View>

      <View style={{marginBottom:'7%'}}>
      <SelectList
              setSelected={val => setUserGender(val)}
              data={genderOptions}
              save="value"
              search={false}
              boxStyles={styles.box} 
              dropdownStyles={styles.dropdown} 
              inputStyles={
                !userGender ? styles.optionInput : styles.optionPressedInput
                } 
                dropdownItemStyles={styles.item} 
                dropdownTextStyles={styles.itemText} 
                placeholder="Choose"
                />
        </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/date-of-birth.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter user D.O.B"
          value={userDob}
          onChangeText={(text) => setUserDob(text)}
        />
      </View>

      <View style={styles.emailInputContainer}>
        <Image source={require('../../assets/phone.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter your phone number"
          value={tempcaretakerPhNo}
          keyboardType='numeric'
          onChangeText={(text) => setTempcaretakerPhNo(text)}
        />
      </View>      

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/phone.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter user phone number"
          placeholderTextColor="#888"
          value={userphno}
          keyboardType="numeric"
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
    paddingHorizontal: '10%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backContainer: {
    height: '10%',
    top: '7%',
    width: '50%',
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '9%',
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
    marginBottom: '8%',
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
    marginBottom: '15%',
  },
  input: {
    flex: 1,
    marginLeft: '3%',
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: '10%',
    height: '60%',
    marginHorizontal: '4%',
  },
  backButton: {
    width: '25%',
    height: '60%',
    marginLeft: '-6%',
    marginTop: '2.5%',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '9%',
    borderWidth: 1,
    height: '%',
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '1.2%',
    paddingHorizontal: '5%',
  },
  dropdown: {
    backgroundColor: 'rgb(248, 250, 250)',
    borderWidth: 1,
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    marginTop: '1%',
    marginBottom: '5%'
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
  },
  signInButton: {
    backgroundColor: 'rgb(233,108,56)',
    padding: '6%',
    borderRadius: 32,
    marginTop: '4%',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#CBCED5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  optionInput: {
    fontSize: 17,
    color: '#888',
    paddingHorizontal: 'auto'
  },
  optionPressedInput: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 17,
    color: '#888',
    textAlign: 'center'
  },
});

export default UserDetails;