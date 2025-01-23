import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Modal, TextInput, Button, Linking } from 'react-native';
import Mapbox, { MapView, Camera,ShapeSource, PointAnnotation } from '@rnmapbox/maps';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');


const Maps = () => {
  const { user,radius,setRadius,setUser,userHomeLocation,caretaker,userCurrentLocation,setUserCurrentLocation } = useLogin();
  const [tempUserHomeCoordinates,setTempUserHomeCoordinates] = useState([0,0]);
  const [tempRadius,setTempRadius] = useState(`0`);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationToggle,setLocationToggle] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [tempUserCurrentCoordinates] = useState([0,0]);

  const handleMapPress = async(event) => {
    setTempUserHomeCoordinates(event.geometry.coordinates);
  };

  const centerHandler = async()=>{
    try {
      if(locationToggle){
        const res1 = await firestore().collection('Caretakers').doc(caretaker.id).set({userHomeCoordinates:tempUserHomeCoordinates}, { merge: true });
        const res2 = await firestore().collection('Users').doc(caretaker.id).set({userHomeCoordinates:tempUserHomeCoordinates}, { merge: true });
        await AsyncStorage.setItem('userHomeLocation',JSON.stringify(tempUserHomeCoordinates));
      }
      setLocationToggle((prev)=>!prev)
    } catch (error) {
      console.log("Error : ",error);
    }
  }
  useEffect(()=>{
    setTempUserHomeCoordinates(userHomeLocation);
    setTempRadius(`${radius}`);
    drawCircumference();
  },[]);

  const drawCircumference = () => {
    const numPoints = 360;
    const points = [];
    const radiusMeters = parseFloat(tempRadius)*1000;
    console.log(tempRadius,radius);
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI / 180) * (i * (360 / numPoints));
      const latitude = tempUserHomeCoordinates[1] + (radiusMeters / 111111) * Math.cos(angle);
      const longitude = tempUserHomeCoordinates[0] + (radiusMeters / (111111 * Math.cos(tempUserHomeCoordinates[1]))) * Math.sin(angle);
      points.push([longitude, latitude]);
    }
    setCoordinates(points);
  };

  useEffect(()=>{
    if (coordinates.length>0) {
      drawCircumference();
    }
  },[tempUserHomeCoordinates,tempRadius,radius,user.userHomeCoordinates]);

  const handleRadiusSubmit = async()=>{
    try {
      const res1 = await firestore().collection('Users').doc(caretaker.id).set({radius:tempRadius}, { merge: true });
      const res2 = await firestore().collection('Caretakers').doc(caretaker.id).set({radius:tempRadius}, { merge: true });
      await AsyncStorage.setItem('radius', tempRadius);
      setRadius(tempRadius);
      setUser({userHomeCoordinates:tempUserCurrentCoordinates});
      setModalVisible(false);
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  const fetchUserCoodinates = async()=>{
    setInterval(async() => {
      const res = await firestore().collection('Users').doc(caretaker.id).get();
      const tempCoordinates = res._data.userCurrentCoordinates;
      setUserCurrentLocation(tempCoordinates);
      console.log(1);
    }, 15000);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={locationToggle && handleMapPress}>
        <Camera
          zoomLevel={10}
          centerCoordinate={tempUserHomeCoordinates}
        />
        {coordinates.length > 0 && (
          <ShapeSource id="circumference" style={{zIndex:1}} shape={{ type: 'LineString', coordinates }}>
            <Mapbox.LineLayer
              id="circumferenceLayer"
              style={{ lineDasharray: [2, 2], lineWidth: 2, lineColor: '#ff0000'}}
            />
          </ShapeSource>
        )}
        <PointAnnotation
          id="pin"
          coordinate={tempUserHomeCoordinates}
        >
          {/* <Image source={require('../assets/homePin.png')}/> */}
        </PointAnnotation>
        <PointAnnotation
          id="pin"
          coordinate={tempUserCurrentCoordinates}
        >
          {/* <Image source={require('../assets/homePin.png')}/> */}
        </PointAnnotation>
      </MapView>
      <TouchableOpacity onPress={centerHandler} style={[styles.centerButton, styles.settingsButton]}>
        <Text style={styles.settingsText}>{locationToggle?"Lock":"Set"} Center</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.radiusButton, styles.settingsButton]}>
        <Text style={styles.settingsText}>Set Radius</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${userCurrentLocation[1]},${userCurrentLocation[0]}`)} style={styles.NavigateButton}>
        <Text style={styles.NavigateButtonText}>Navigate</Text>
      </TouchableOpacity>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Set Location (in kms)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter radius"
              placeholderTextColor="lightgray"
              keyboardType='numeric'
              value={tempRadius}
              onChangeText={setTempRadius}
            />
              <TouchableOpacity onPress={handleRadiusSubmit} style={{backgroundColor:"powderblue",paddingHorizontal:10,paddingVertical:5,borderRadius:8}} >
                <Text>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setModalVisible(false)} style={{position:'absolute',top:15,right:15}} >
                <Text style={{fontWeight:900,fontSize:20,color:"black"}}>X</Text>
              </TouchableOpacity>
            {/* <Button title="Submit" disabled={!tempUserHomeCoordinates || !tempRadius} onPress={() => handleSubmit()} />
            <Button title="Submit" disabled={!tempUserHomeCoordinates || !tempRadius} onPress={() => handleSubmit()} /> */}
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  NavigateButton: {
    position: 'absolute', 
    bottom: '4%',
    backgroundColor: 'rgb(233,108,56)',
    paddingVertical:'5%',
    borderRadius: 32,
    zIndex: 999,
    justifyContent: 'center',
    width: '70%',
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'gray',
  },
  settingsButton: {
    position: 'absolute',
    paddingVertical:'8%',
    zIndex: 998,
    justifyContent: 'center',
    width: '25%',
    borderRadius: 7,
    right: '2%',
  },
  settingsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },

  centerButton: {
    backgroundColor: 'rgb(0, 92, 23)',
    top: '5%'
  },
  radiusButton: {
    backgroundColor: 'rgb(0, 87, 158)',
    top: '11%'
  },
  NavigateButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Maps;
