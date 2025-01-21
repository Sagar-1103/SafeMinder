import React from 'react';
import {LogBox} from 'react-native';
import FitComponent from './components/Fit';
import SplashScreen from './screens/commonScreens/SplashScreen';
import RoleScreen from './screens/commonScreens/RoleScreen';
import CaretakerSignIn from './screens/caretakerScreens/CaretakerSignIn';
import CaretakerSignUp from './screens/caretakerScreens/CaretakerSignUp';
import SignIn from './screens/userScreens/UserSignIn';


LogBox.ignoreLogs(['new NativeEventEmitter']);


const App = () => {

  return (
   <SignIn/>
  );
};

export default App;
