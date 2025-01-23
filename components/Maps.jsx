import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import { useLogin } from '../context/LoginProvider';

Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');


const Maps = () => {
  const { userHomeLocation } = useLogin();
  
  const handleSubmit = () => {
    //
    //
    //
    console.log("Button clicked");
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera
          zoomLevel={10}
          centerCoordinate={userHomeLocation}
        />
        <PointAnnotation
          id="pin"
          coordinate={userHomeLocation}
        />
      </MapView>

      {/* Floating Sign In Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.NavigateButton}>
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
  NavigateButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Maps;
