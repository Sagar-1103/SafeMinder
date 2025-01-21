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
import Lock from '../../assets/lock.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../../context/LoginProvider';

const UserSignIn = ({navigation}) => {
  const [tempCode, setTempCode] = useState('');
  const {setLoggedIn, setRole} = useLogin();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn: false,
  });

  const handleSubmit = async () => {
    try {
      if (!tempCode.trim()) {
        setModalMessage({
          title: 'Incomplete Information',
          description:
            'Please ensure all fields are filled in correctly before proceeding.',
        });
        setModalVisible(true);
        return;
      }
      await AsyncStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
      await AsyncStorage.setItem('role', 'user');
      setRole('user');
    } catch (error) {
      console.log('Error signing user : ', error);
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
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.InnerText}>
          Ask your caretaker to provide pairing code
        </Text>

        <View style={styles.emailInputContainer}>
          <Image source={Lock} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Enter your pairing code"
            value={tempCode}
            onChangeText={text => setTempCode(text)}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32, // Use percentage font size
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '20%',
    marginBottom: '12%', // Use percentage margin
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
  input: {
    flex: 1,
    marginLeft: '3%',
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: '8%', // Use percentage width
    height: '42%', // Use percentage height
    marginHorizontal: '4%',
  },
  signInButton: {
    width: '100%',
    backgroundColor: 'rgb(233,108,56)', // Red color
    padding: '6%', // Use percentage padding
    borderRadius: 30,
    marginTop: '4%', // Use percentage margin
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  InnerText: {
    marginTop: '12%',
    marginBottom: '22%',
    // width: '80%',
    fontSize: 22,
    textAlign: 'center',
    color: 'rgb(73, 70, 70)',
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

export default UserSignIn;
