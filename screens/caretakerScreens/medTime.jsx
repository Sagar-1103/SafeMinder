import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const MedTime = ({navigation}) => {
  const [dates, setDates] = useState([null, null, null, null]);
  const [openIndex, setOpenIndex] = useState(null);
  const timeLabels = ['Breakfast Time', 'Lunch Time', 'Select Snacks Time', 'Select Dinner Time'];
  const iconSources = [
    require('../../assets/breakfastActive.png'),
    require('../../assets/lunchAcctive.png'),
    require('../../assets/snackActive.png'),
    require('../../assets/dinnerActive.png'),
  ];

  const {medDates,user,setMedDates} = useLogin();

  const handleSubmit = async() => {
    try {
      console.log(dates);
      setMedDates(dates);
      await firestore().collection('Users').doc(user?.id).update({medDates: dates});
      await AsyncStorage.setItem('medDates',JSON.stringify(dates));
      
      console.log("Medicine Time Added");
      navigation.navigate("UserCodeScreen");
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <View>
            <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
        </View>
      </TouchableOpacity>
        <View style={styles.headerContainer}>      
          <Text style={styles.title}>Select Time</Text>
        </View>
        <Text style={styles.InnerText}>These will be used to send medication reminder.</Text>
        <Text style={styles.InnerLine}>______________________________</Text>
      <View style={styles.iconColumn}>
        {dates.map((date, index) => (
          <View key={index} style={styles.row}>
            <Image source={iconSources[index]} style={styles.icon} />
            <TouchableOpacity onPress={() => setOpenIndex(index)} style={styles.textContainer}>
              <Text style={styles.medTimes}>
                {date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : timeLabels[index]}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {openIndex !== null && (
        <DatePicker
          modal
          open={openIndex !== null}
          date={dates[openIndex] || new Date()}
          mode="time"
          onConfirm={(selectedDate) => {
            const newDates = [...dates];
            newDates[openIndex] = selectedDate;
            setDates(newDates);
            setOpenIndex(null);
          }}
          onCancel={() => setOpenIndex(null)}
        />
      )}
      <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: '#fff',
  },
  InnerText: {
    marginTop: '12%',
    fontSize: 22,
    textAlign: 'center',
    color: 'rgb(73, 70, 70)',
  },
  InnerLine: {
    fontSize: 22,
    marginBottom: '15%',
    textAlign: 'center',
    color: '#888',
    width: '100%',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backContainer: {
    height: '10%',
    top: '7%',
    width: '50%',
  },
  medTimes: {
    fontSize: 18,
    color: '#888',
    marginLeft: 20,
    textAlign: 'left', 
  },
  iconColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '10%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', 
  },
  textContainer: {
    marginLeft: 20,
    flex: 1, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-8%',
    marginBottom: '15%',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20, // Keep space between the icon and text
  },
  backButton: {
    width: '25%',
    height: '60%',
    marginLeft: '-6%',
    marginTop: '2.5%',
  },
  signInButton: {
    backgroundColor: 'rgb(233,108,56)',
    padding: '6%',
    borderRadius: 32,
    marginTop: '40%',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
});

export default MedTime;
