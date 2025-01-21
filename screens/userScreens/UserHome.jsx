import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const UserHome = () => {
  return (
    <LinearGradient
      colors={['rgb(170, 170, 170)', 'rgba(255,255,255,1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        
        <View style={styles.row}>

          <LinearGradient
            colors={['#000', '#555']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.iconText}>Settings</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(48,195,242)','rgb(0,172,235)', 'rgb(0,149,219)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.iconText}>Home</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.row}>

          <LinearGradient
            colors={['rgb(208,32,31)', 'rgb(233,108,56)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.iconText}>Medicine</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(100,63,153)','rgb(110,51,147)', 'rgb(164,62,151)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.iconText}>Voice</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.row}>

          <LinearGradient
            colors={['rgb(91,88,166)','rgb(45,54,144)', 'rgb(73,68,115)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity style={styles.touchable}>
              <Image
                source={{ uri: 'image_url_1' }}
                style={styles.profileImage}
              />
              <Text style={styles.iconText}>person1</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(91,88,166)','rgb(45,54,144)', 'rgb(73,68,115)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity style={styles.touchable}>
              <Image
                source={{ uri: 'image_url_2' }}
                style={styles.profileImage}
              />
              <Text style={styles.iconText}>person2</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <LinearGradient
            colors={['rgb(239,70,51)','rgb(243,112,97)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rectBox}
        >
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.sosText}>Emergency SOS</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconBox: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectBox: {
    width: '100%',
    height: '20%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: '100%',
    height: '100%',
  },
  iconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
});

export default UserHome;
