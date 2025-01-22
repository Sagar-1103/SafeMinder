import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Onboarding2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("Onboarding3")} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {/* Add the image component here */}
        <Image source={require('../../assets/Onboarding2.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.title}>Track and Care remotely.</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.onboardingContainer}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator } />
          <View style={[styles.indicator, styles.activeIndicator]} />
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate("Onboarding3")} style={styles.nextButton}>
          <Image source={require('../../assets/nextButton.png')} style={styles.nextImg}/>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    skipButton: {
      alignSelf: 'flex-end',
      marginTop: 50,
    },
    skipText: {
      fontSize: 16,
      color: '#9BA3AF',
    },
    textContainer:
    {
        width: '50%',
        textAlign: 'left',
        right : '20%'
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      width: '120%',
      height: undefined,
      aspectRatio: 0.98,
      marginTop: '30%',
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'left',
      marginBottom: 20,
    },
    onboardingContainer: {
      flexDirection: 'row',  
      alignItems: 'center',   
      justifyContent: 'space-between', 
      width: '100%',
      paddingHorizontal: 20,
    },
    indicatorContainer: {
      flexDirection: 'row',
    },
    indicator: {
      height: 8,
      width: 20,
      borderRadius: 4,
      backgroundColor: '#F5A28D',
      marginRight: 5,
    },
    activeIndicator: {
      backgroundColor: '#E8684A',
    },
    nextButton: {
      width: 60,
      height: 60,
      marginHorizontal: '70%'
    },
    nextImg: {
        width: 60,
        height: 60,
    },
    arrow: {
      fontSize: 50,
      color: '#FFF',
      paddingBottom: '10%'
    },
  });
  
  export default Onboarding2;
  