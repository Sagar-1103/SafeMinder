import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import ModalComponent from '../../components/Modal';
import ImagePicker from 'react-native-image-crop-picker';

const SetSpeedDial = ({ navigation }) => {
  const [contact1, setContact1] = useState({ name: '', phNo: '', image: null });
  const [contact2, setContact2] = useState({ name: '', phNo: '', image: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn: false,
  });

  useEffect(() => {
    requestGalleryPermission();
  }, []);
  

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your photo gallery.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Gallery permission granted');
        } else {
          console.log('Gallery permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const uploadFromGallery = (contactKey) => {
    ImagePicker.openPicker({
      width: 1024,
      height: 1024,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8, // Compress image to reduce size
    })
      .then((image) => {
        
        if (contactKey === 'contact1') {
          setContact1((prev) => ({ ...prev, image: image.path }));
        } else if (contactKey === 'contact2') {
          setContact2((prev) => ({ ...prev, image: image.path }));
        }
        console.log('Selected Image Path:', image.path);
      })
      .catch((error) => {
        console.log('Image selection error:', error);
      });
  };

  const upload = side => {
    ImagePicker.openPicker({
      width: 1024,
      height: 1024,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 1, // 1 means no compression, 0 means maximum compression
      compressImageMaxWidth: 1024, // set maximum width
      compressImageMaxHeight: 1024,
      cropperToolbarTitle:"Crop Eye Image",
    })
      .then(image => {
        console.log(image.size);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    try {
      // if (!contact1.name || !contact1.phNo || !contact2.name || !contact2.phNo) {
      //   setModalMessage({
      //     title: 'Incomplete Information',
      //     description:
      //       'Please ensure all fields are filled in correctly before proceeding.',
      //   });
      //   setModalVisible(true);
      //   return;
      // }
      // console.log('Contact 1 Details:', contact1);
      // console.log('Contact 2 Details:', contact2);
      navigation.navigate("UserCodeScreen");
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalMessage.title}
        description={modalMessage.description}
        showBtn={modalMessage.showBtn}
      />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <View>
            <Image
              source={require('../../assets/backButton.png')}
              style={styles.backButton}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Set Speed Dial</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => uploadFromGallery('contact1')}
            style={styles.imageContainer}>
            {contact1.image ? (
              <Image source={{ uri: contact1.image }} style={styles.uploadImage} />
            ) : (
              <Image
                source={require('../../assets/sms.png')}
                style={styles.uploadImagePlaceholder}
              />
            )}
          </TouchableOpacity>
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
          <TextInput
            style={styles.input}
            placeholder="Contact 1 Number"
            placeholderTextColor="#888"
            value={contact1.phNo}
            onChangeText={(text) =>
              setContact1((prev) => ({ ...prev, phNo: text }))
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => upload('left')}
            style={styles.imageContainer}>
            {contact2.image ? (
              <Image source={{ uri: contact2.image }} style={styles.uploadImage} />
            ) : (
              <Image
                source={require('../../assets/sms.png')}
                style={styles.uploadImagePlaceholder}
              />
            )}
          </TouchableOpacity>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contact 2 Number"
            placeholderTextColor="#888"
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
    paddingHorizontal: '10%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#888',
    borderRadius: 50,
    justifyContent: 'center',
  },
  uploadImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadImagePlaceholder: {
    width: 60,
    height: 60,
    tintColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#e96c38',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SetSpeedDial;
