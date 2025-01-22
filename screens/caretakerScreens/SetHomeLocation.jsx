import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  FlatList
} from 'react-native';
import Mapbox, {MapView, Camera, PointAnnotation} from '@rnmapbox/maps';
import ModalComponent from '../../components/Modal';
import debounce from 'lodash.debounce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';
import firestore from '@react-native-firebase/firestore';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA',
);

const SetHomeLocation = ({navigation}) => {
  const [tempLocation, setTempLocation] = useState('');
  const [coordinates, setCoordinates] = useState([0,0]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [recommendations, setRecommendations] = useState([]);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn: false,
  });
  const {userHomeLocation, setUserHomeLocation,caretaker} = useLogin();

  const fetchRecommendations = async text => {
    const accessToken =
      'pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA';
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          text,
        )}.json?autocomplete=true&access_token=${accessToken}`,
      );
      const data = await response.json();
      if (data.features) {
        setRecommendations(
          data.features.map(feature => ({
            name: feature.place_name,
            coordinates: feature.center,
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleMapPress = (event) => {
    setCoordinates(event.geometry.coordinates);
  };

  const debouncedFetchRecommendations = debounce(async (text) => {
    await fetchRecommendations(text);
}, 5000);

  const handleSelectRecommendation = item => {
    setTempLocation(item.name);
    setCoordinates(item.coordinates);
    setRecommendations([]);
  };

  const handleSubmit = async() => {
    try {
      console.log(coordinates);
      setUserHomeLocation(coordinates);
      const res1 = await firestore().collection('Caretakers').doc(caretaker.id).set({userHomeCoordinates:coordinates}, { merge: true });
      const res2 = await firestore().collection('Users').doc(caretaker.id).set({userHomeCoordinates:coordinates}, { merge: true });
      await AsyncStorage.setItem('userHomeLocation', JSON.stringify(coordinates));
      navigation.navigate('SetSpeedDial');
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleInputChange = (text) => {
    setTempLocation(text);
    if (text.trim() !== '') {
        debouncedFetchRecommendations(text);
    } else {
        setRecommendations([]);
    }
};

  useEffect(()=>{
    setCoordinates(userHomeLocation);
  },[coordinates])

  return (
    <>
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} title={modalMessage.title} description={modalMessage.description} showBtn={modalMessage.showBtn}  />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backContainer}>
          <View>
            <Image
              source={require('../../assets/backButton.png')}
              style={styles.backButton}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Set Home Location</Text>
        </View>

        <View style={styles.inputContainer}>
  <Image
    source={require('../../assets/User-Outline.png')}
    style={styles.inputIcon}
  />
  <TextInput
    style={styles.input}
    placeholderTextColor="#888"
    placeholder="Search"
    value={tempLocation}
    onChangeText={handleInputChange}
  />
</View>
{recommendations.length > 0 && (
  <FlatList
    data={recommendations}
    keyExtractor={(item, index) => index.toString()}
    style={styles.recommendationList}
    renderItem={({item}) => (
      <TouchableOpacity
        style={styles.recommendationItem}
        onPress={() => handleSelectRecommendation(item)}>
        <Text style={styles.recommendationText}>{item.name}</Text>
      </TouchableOpacity>
    )}
  />
)}

        <View style={styles.mapContainer}>
          <MapView onPress={handleMapPress} style={styles.mapBox}>
            <Camera zoomLevel={10} centerCoordinate={coordinates} />
            <PointAnnotation id="pin" coordinate={coordinates} />
          </MapView>
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
    paddingHorizontal: '12%',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '0.2%',
  },
  recommendationList: {
    position: 'absolute',
    top: '20%', // Adjust based on your layout
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 10,
    zIndex: 100,
    maxHeight: 150,
  },
  recommendationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(212, 209, 209)',
  },
  recommendationText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    flex: 1,
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: '10%',
    height: '60%',
    marginHorizontal: '4%',
  },
  title: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    top: '3.5%',
    left: '20%',
    fontWeight: 'bold',
  },
  backContainer: {
    height: '8%',
    top: '7%',
    width: '50%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-8%',
    marginBottom: '15%',
  },
  mapContainer: {
    height: '60%',
    width: '100%',
    borderRadius: 22,
  },
  mapBox: {
    height: '100%',
    width: '100%',
    zIndex: 10,
    borderRadius: 22,
  },
  input: {
    flex: 1,
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    width: '10%',
    height: '60%',
    marginHorizontal: '4%',
  },
  backButton: {
    width: '20%',
    height: '60%',
    marginLeft: '-6%',
    marginTop: '1%',
  },
  searchButton: {
    backgroundColor: 'rgb(233,108,56)',
    borderRadius: 15,
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    marginRight: '2%',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
});

export default SetHomeLocation;
