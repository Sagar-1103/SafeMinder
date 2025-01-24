import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import ModalComponent from '../../components/Modal';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Profile from '../../assets/Profile.png'


const SetSpeedDial = ({navigation}) => {
  const [contact1, setContact1] = useState({name:'',phNo:''});
  const [contact2, setContact2] = useState({name:'',phNo:''});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn:false
  });
  const {caretaker,setContacts} = useLogin();

  const handleSubmit = async()=>{
    try {
      if (!contact1.name || !contact1.phNo || !contact2.name || !contact2.phNo) {
        setModalMessage({
          title: 'Incomplete Information',
          description: 'Please ensure all fields are filled in correctly before proceeding.',
        });
        setModalVisible(true);
        return;
      }

      const updatedContacts = [
        { name: contact1.name, phNo: contact1.phNo },
        { name: contact2.name, phNo: contact2.phNo },
      ];
      setContacts(updatedContacts);
      const res1 = await firestore().collection('Caretakers').doc(caretaker.id).set({contacts:updatedContacts}, { merge: true });
      const res2 = await firestore().collection('Users').doc(caretaker.id).set({contacts:updatedContacts}, { merge: true });
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      navigation.navigate("UserCodeScreen");
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem('contacts');
        if (storedContacts) {
          const parsedContacts = JSON.parse(storedContacts);
          if (parsedContacts.length > 0) {
            setContact1(parsedContacts[0] || { name: '', phNo: '' });
            setContact2(parsedContacts[1] || { name: '', phNo: '' });
          }
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    loadContacts();
  }, []);

  return (
    <>
    <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} title={modalMessage.title} description={modalMessage.description} showBtn={modalMessage.showBtn} />
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS or Android
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backContainer}>
          <View>
            <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Set Speed Dial</Text>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageUploadContainer}>
            <Image  source={require('../../assets/speedDial2.png')} style={styles.uploadImage} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/User-Outline.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Contact 1 Name"
            value={contact1.name}
            onChangeText={(text) =>
              setContact1((prev) => ({ ...prev, name: text }))
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/phone.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contact 1 Number"
            placeholderTextColor="#888"
            value={contact1.phNo}
            keyboardType='numeric'
            onChangeText={(text) =>
              setContact1((prev) => ({ ...prev, phNo: text }))
            }
          />
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageUploadContainer}>
            <Image source={require('../../assets/speedDial1.png')} style={styles.uploadImage} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets//User-Outline.png')}  style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Enter your email"
            value={contact2.name}
            onChangeText={(text) =>
              setContact2((prev) => ({ ...prev, name: text }))
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/phone.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contact 2 Number"
            placeholderTextColor="#888"
            value={contact2.phNo}
            keyboardType='numeric'
            onChangeText={(text) =>
              setContact2((prev) => ({ ...prev, phNo: text }))
            }
          />
        </View>


        <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically
    paddingHorizontal: '10%',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  uploadImage: {
    height: '100%',
    width: '100%',
  },
  backContainer: {
    // height: 40,
    marginBottom: '0%',
    top: '4.0%',
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerContainer: {
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageUploadContainer: {
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#888',
    borderRadius: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: 20,
    height: 20,
  },
  signInButton: {
    backgroundColor: 'rgb(233,108,56)',
    padding: 15,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});

export default SetSpeedDial;