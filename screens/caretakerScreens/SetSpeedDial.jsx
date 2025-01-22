import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ModalComponent from '../../components/Modal';
import { useLogin } from '../../context/LoginProvider';
const SetSpeedDial = ({navigation}) => {
  const [contact1, setContact1] = useState({name:'',phNo:''});
  const [contact2, setContact2] = useState({name:'',phNo:''});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn:false
  });

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
    } catch (error) {
      console.log("Error : ",error);
    }
  }

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
              
              <Text style={styles.title}>Set Speed Dial</Text>
            </View>
        <View style={styles.imageContainer}>
            <View style={styles.imageUploadContainer}>
                <Image source={require('../../assets/sms.png')} style={styles.uploadImage}/>
            </View>
        </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
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
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contact 1 Number"
          placeholderTextColor="#888"
          secureTextEntry
          value={contact1.phNo}
          onChangeText={(text) =>
            setContact1((prev) => ({ ...prev, phNo: text }))
          }
        />
      </View>
      <View style={styles.imageContainer1}>
            <View style={styles.imageUploadContainer1}>
                <Image source={require('../../assets/sms.png')} style={styles.uploadImage}/>
            </View>
        </View>
      <View style={styles.inputContainer1}>
        <Image source={require('../../assets/sms.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Contact 2 Name"
          value={contact2.name}
          onChangeText={(text) =>
            setContact2((prev) => ({ ...prev, name: text }))
          }
        />
      </View>
      <View style={styles.inputContainer1}>
        <Image source={require('../../assets/lock.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contact 2 Number"
          placeholderTextColor="#888"
          secureTextEntry
          value={contact2.phNo}
          onChangeText={(text) =>
            setContact2((prev) => ({ ...prev, phNo: text }))
          }
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Finish</Text>
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
    fontWeight: 'bold', // Use percentage margin
    bottom: '6%'
  },
  imageContainer: {
    alignItems: 'center',
    bottom: '5%',
  },
  imageUploadContainer: {
    alignItems: 'center',
    height: '40%',
    width: '40%',
    backgroundColor: '#888',
    borderRadius: 32,
  },
  uploadImage: {
    
  },
  imageContainer1: {
    alignItems: 'center',
    bottom: '26%',
  },
  imageUploadContainer1: {
    alignItems: 'center',
    height: '40%',
    width: '40%',
    backgroundColor: '#888',
    borderRadius: 32,
  },
  backContainer: {
    height: '10%',
    top: '4.5%',
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
    bottom: '69%',
  },
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%', // Use percentage margin
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '1.2%',
    paddingHorizontal: '5%',
    bottom: '122%',
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
  signInButton: {
    backgroundColor: 'rgb(233,108,56)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 32,
    bottom: '46%', // Use percentage margin
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
export default SetSpeedDial;