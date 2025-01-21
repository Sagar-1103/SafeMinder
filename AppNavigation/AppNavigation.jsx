import React, { useEffect, useState } from 'react';
import SplashScreen from "../screens/commonScreens/SplashScreen";
import RoleScreen from "../screens/commonScreens/RoleScreen";
import UserSignIn from "../screens/userScreens/UserSignIn";
import CaretakerSignUp from "../screens/caretakerScreens/CaretakerSignUp";
import CaretakerSignIn from "../screens/caretakerScreens/CaretakerSignIn";
import UserHome from "../screens/userScreens/UserHome";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Temp from '../components/Temp';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [loading,setLoading] = useState(true);
    const {role,setRole,loggedIn,setCaretaker,setLoggedIn} = useLogin();

    GoogleSignin.configure({
        webClientId: "294068590748-cslueqdkqbn32u6im50h9fmp37t76jt2.apps.googleusercontent.com",
    });
    
    useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[])

    const storageAccess = async()=>{
            const tempLoggedIn = await AsyncStorage.getItem('loggedIn');
            const tempRole  = await AsyncStorage.getItem('role');
            const tempCaretakerDetails  = await AsyncStorage.getItem('caretaker');
            setCaretaker(JSON.parse(tempCaretakerDetails));
            setRole(tempRole);
            if(tempLoggedIn==="true"){
                setLoggedIn(true);
            }
    }

    if (loading) {
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SplashScreen"  >
                   <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            </Stack.Navigator>
          );
    }
    if(!loggedIn){
        return (
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="RoleScreen"  >
                            <Stack.Screen name="RoleScreen" component={RoleScreen}/>
                            <Stack.Screen name="UserSignIn" component={UserSignIn}/>
                            <Stack.Screen name="CaretakerSignUp" component={CaretakerSignUp}/>
                            <Stack.Screen name="CaretakerSignIn" component={CaretakerSignIn}/>
                </Stack.Navigator>
                );
    }
    if(role==="user"){
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="UserHome"  >
                       <Stack.Screen name="UserHome" component={UserHome}/>
            </Stack.Navigator>
        );
    }
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Temp"  >
                   <Stack.Screen name="Temp" component={Temp}/>
        </Stack.Navigator>
    );
  
};

export default AppNavigation;
