import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import { useLogin } from '../context/LoginProvider';

Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');


const Maps = () => {
  const {userHomeLocation} = useLogin();
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Maps;
