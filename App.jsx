import React from 'react';
import {LogBox} from 'react-native';
import FitComponent from './components/Fit';
import SplashScreen from './screens/commonScreens/SplashScreen';
import RoleScreen from './screens/commonScreens/RoleScreen';
LogBox.ignoreLogs(['new NativeEventEmitter']);


const App = () => {

  return (
   <RoleScreen/>
  );
};

export default App;
