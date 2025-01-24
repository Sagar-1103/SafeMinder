import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/safeMinderLogoOnly.png'; // Replace with your profile image or icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useLogin } from '../context/LoginProvider';

const UserProfilePage = ({ navigation }) => {
  
  const {user} = useLogin();
  const handleLogout = async() => {
    await AsyncStorage.clear();
  };

  return (
    <LinearGradient
      colors={['#2E3192', '#1BFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image and Basic Info */}
        <View style={styles.profileImageContainer}>
          <Image source={Logo} style={styles.profileImage} />
          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Primary Email'}</Text>
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{user?.number || 'Not Available'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>User Code:</Text>
            <Text style={styles.value}>{user?.id || 'N/A'}</Text>
          </View>
        </View>

        {/* Contacts */}
        <View style={styles.contactsContainer}>
          <Text style={styles.sectionTitle}>Contacts</Text>
          {user?.contacts?.length > 0 ? (
            user.contacts.map((contact, index) => (
              <View key={index} style={styles.contactRow}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.phNo}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noContacts}>No contacts available</Text>
          )}
        </View>

        {/* Logout Button */}
        <LinearGradient
          colors={['#FF512F', '#DD2476']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoutButton}
        >
          <TouchableOpacity onPress={handleLogout} style={styles.touchable}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  detailsContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '300',
  },
  contactsContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  contactName: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  contactNumber: {
    fontSize: 16,
    color: '#ffffff',
  },
  noContacts: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  logoutButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default UserProfilePage;