import React, { useEffect, useState } from 'react';
import SplashScreen from "../screens/commonScreens/SplashScreen";
import RoleScreen from "../screens/commonScreens/RoleScreen";
import UserSignIn from "../screens/userScreens/UserSignIn";
import CaretakerSignUp from "../screens/caretakerScreens/CaretakerSignUp";
import CaretakerSignIn from "../screens/caretakerScreens/CaretakerSignIn";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDetails from "../screens/caretakerScreens/UserDetails";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Onboarding1 from '../screens/caretakerScreens/Onboarding1';
import Onboarding2 from '../screens/caretakerScreens/Onboarding2';
import Onboarding3 from '../screens/caretakerScreens/Onboarding3';
import Temp from "../components/Temp";
import SetHomeLocation from '../screens/caretakerScreens/SetHomeLocation';
import SetSpeedDial from '../screens/caretakerScreens/SetSpeedDial';
import UserCodeScreen from '../screens/caretakerScreens/UserCodeScreen';
import TabNavigation from './TabNavigation';
import BackgroundTasks from '../components/BackgroundTasks';
import ReportsPage from '../screens/caretakerScreens/ReportsPage';
import UserProfilePage from '../components/UserProfilePage';
import FallAlert from '../screens/userScreens/FallAlert';
import MedicineList from '../screens/userScreens/MedicineList';
import MedTime from '../screens/caretakerScreens/medTime';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [loading,setLoading] = useState(true);
    const {role,setRole,setMedDates,loggedIn,process,setUserCurrentLocation,setRadius,setProcess,setCaretaker,setContacts,setUser,setLoggedIn,isAssigned,setIsAssigned,code,setCode,setUserHomeLocation} = useLogin();

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
            const tempCode  = await AsyncStorage.getItem('code');
            const tempCaretakerDetails  = await AsyncStorage.getItem('caretaker');
            const tempUserDetails  = await AsyncStorage.getItem('user');
            const tempIsAssigned = await AsyncStorage.getItem('isAssigned');
            const tempUserHomeCoordinates = await AsyncStorage.getItem('userHomeLocation');
            const tempRadius = await AsyncStorage.getItem('radius');
            console.log(tempRadius);
            const tempProcess = await AsyncStorage.getItem('process');
            const tempContacts = await AsyncStorage.getItem('contacts');
            const tempUserCurrentLocation = await AsyncStorage.getItem('userCurrentLocation');
            const tempDates = await AsyncStorage.getItem('medDates');
            setMedDates(JSON.parse(tempDates))          
            setUserCurrentLocation(JSON.parse(tempUserCurrentLocation));
            setContacts(JSON.parse(tempContacts));
            setCaretaker(JSON.parse(tempCaretakerDetails));
            setUserHomeLocation(JSON.parse(tempUserHomeCoordinates));
            setUser(JSON.parse(tempUserDetails));
            setRole(tempRole);
            setCode(tempCode);
            if(tempLoggedIn==="true"){
                setLoggedIn(true);
            }
            if(tempIsAssigned==="true"){
                setIsAssigned(true);
            } 
            if(tempProcess==="true"){
                setProcess(true);
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
                            <Stack.Screen name="Onboarding1" component={Onboarding1}/>
                            <Stack.Screen name="Onboarding2" component={Onboarding2}/>
                            <Stack.Screen name="Onboarding3" component={Onboarding3}/>
                            <Stack.Screen name="CaretakerSignUp" component={CaretakerSignUp}/>
                            <Stack.Screen name="CaretakerSignIn" component={CaretakerSignIn}/>
                </Stack.Navigator>
                );
    }
    if(role==="caretaker" && !isAssigned){
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="UserDetails"  >
                       <Stack.Screen name="UserDetails" component={UserDetails}/>
            </Stack.Navigator>
        );
    }
    if(role==="caretaker" && isAssigned && !process){
            return (
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SetHomeLocation"  >
                           <Stack.Screen name="SetHomeLocation" component={SetHomeLocation}/>
                           <Stack.Screen name="SetSpeedDial" component={SetSpeedDial}/>
                           <Stack.Screen name="MedTime" component={MedTime}/>
                           <Stack.Screen name="UserCodeScreen" component={UserCodeScreen}/>
                </Stack.Navigator>
            );
        }
    if(role==="caretaker" && isAssigned && process){
        return <TabNavigation/>;
    }
    if(role==="user"){
        return (
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="BackgroundTasks"  >
                        <Stack.Screen name="BackgroundTasks" component={BackgroundTasks}/>
                        <Stack.Screen name="ReportsPage" component={ReportsPage}/>
                        <Stack.Screen name="UserProfilePage" component={UserProfilePage}/>
                        <Stack.Screen name="FallAlert" component={FallAlert}/>
                        <Stack.Screen name="MedicineList" component={MedicineList}/>
                        <Stack.Screen name="Temp" component={Temp}/>
                </Stack.Navigator>
        );
    }
        
};

export default AppNavigation;
