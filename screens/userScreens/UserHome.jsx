import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../../assets/safeMinderLogo.png";
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '../../context/LoginProvider';

const UserHome = ({ startAllBackgroundServices, stopAllBackgroundServices }) => {
  const [serviceStatus, setServiceStatus] = useState(false);
  const {user,caretaker} = useLogin();
  
  const navigation = useNavigation(); // Correct usage here

  const handleServices = async () => {
    if (!serviceStatus) {
      setServiceStatus(true);
      startAllBackgroundServices();
      console.log("Services Started");
    } else {
      setServiceStatus(false);
      stopAllBackgroundServices();
      console.log("Services Closed");
    }
  };

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
            <TouchableOpacity
              onLongPress={handleServices}
              delayLongPress={2000}
              style={styles.touchable}
              onPress={()=>navigation.navigate("UserProfilePage")}
            >
              <Image source={require('../../assets/UserSelectionProfile.png')} style={styles.profileImage1} />
              <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(48,195,242)', 'rgb(0,172,235)', 'rgb(0,149,219)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity onPress={()=>Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${user.userHomeCoordinates[1]},${user.userHomeCoordinates[0]}`)} style={styles.touchable}>
            <Image source={require('../../assets/homeUser.png')} style={styles.profileImage} />
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
            <TouchableOpacity onPress={()=>navigation.navigate("MedicineList")} style={styles.touchable}>
            <Image source={require('../../assets/pill.png')} style={styles.profileImage} />
              <Text style={styles.iconText}>Medicine</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(100,63,153)', 'rgb(110,51,147)', 'rgb(164,62,151)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ReportsPage")} // Use navigation.navigate
              style={styles.touchable}
            >
              <Image source={require('../../assets/healthWhite.png')} style={styles.profileImage} />
              <Text style={styles.iconText}>Health</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.row}>
          <LinearGradient
            colors={['rgb(91,88,166)', 'rgb(45,54,144)', 'rgb(73,68,115)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity onPress={()=> Linking.openURL(`tel:${user.contacts[0].phNo}`)} style={styles.touchable}>
              <Image source={require('../../assets/speedDial1.png')} style={styles.profileImage1} />
              <Text style={styles.iconText}>{user.contacts[0].name}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(91,88,166)', 'rgb(45,54,144)', 'rgb(73,68,115)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity  onPress={()=> Linking.openURL(`tel:${user.contacts[1].phNo}`)} style={styles.touchable}>
              <Image source={require('../../assets/speedDial2.png')} style={styles.profileImage1} />
              <Text style={styles.iconText}>{user.contacts[1].name}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={['rgb(239,70,51)', 'rgb(243,112,97)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rectBox}
        >
          <TouchableOpacity onPress={()=> Linking.openURL(`tel:${caretaker.number}`)} style={styles.touchable}>
            <Image source={require('../../assets/warning.png')} style={styles.profileImage} />            
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
    // borderRadius: 25,
    marginBottom: 8,
  },
  profileImage1: {
    width: 70,
    height: 70,
    // borderRadius: 25,
    marginBottom: 8,
  },
});

export default UserHome;
