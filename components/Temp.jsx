//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLogin } from '../context/LoginProvider';


// create a component
const Temp = () => {
    const { role, code, loggedIn, isAssigned, caretaker, user } = useLogin();
    
    return (
        <View style={styles.container}>
            <Text>Role: {role}</Text>
            <Text>Code: {code}</Text>
            <Text>Logged In: {loggedIn ? 'Yes' : 'No'}</Text>
            <Text>Is Assigned: {isAssigned ? 'Yes' : 'No'}</Text>
            <Text>Caretaker: {JSON.stringify(caretaker, null, 2)}</Text>
            <Text>User: {JSON.stringify(user, null, 2)}</Text>
        </View>
    );
};


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Temp;
