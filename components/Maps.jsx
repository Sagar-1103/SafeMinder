import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');


const Maps = () => {
  const centerCoordinates = [75, 15];

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera
          zoomLevel={10}
          centerCoordinate={centerCoordinates}
        />
        <PointAnnotation
          id="pin"
          coordinate={centerCoordinates}
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
