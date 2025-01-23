import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import { useLogin } from '../context/LoginProvider';

Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');


const Maps = () => {
  const { userHomeLocation,user } = useLogin();
  const [tempUserHomeCoordinates,setTempUserHomeCoordinates] = useState([0,0]);
  console.log(user.userHomeCoordinates);
  
  useEffect(()=>{

  },[]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera
          zoomLevel={10}
          centerCoordinate={tempUserHomeCoordinates}
        />
        <PointAnnotation
          id="pin"
          coordinate={tempUserHomeCoordinates}
        >
          {/* <Image source={require('../assets/homePin.png')}/> */}
        </PointAnnotation>
        <PointAnnotation
          id="pin"
          coordinate={tempUserHomeCoordinates}
        >
          {/* <Image source={require('../assets/homePin.png')}/> */}
        </PointAnnotation>
      </MapView>
      <TouchableOpacity style={[styles.centerButton, styles.settingsButton]}>
        <Text style={styles.settingsText}>Set Center</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.radiusButton, styles.settingsButton]}>
        <Text style={styles.settingsText}>Set Radius</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.NavigateButton}>
        <Text style={styles.NavigateButtonText}>Navigate</Text>
      </TouchableOpacity>
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
