import React from 'react';
import {LogBox} from 'react-native';
import FitComponent from './components/Fit';
import SplashScreen from './screens/commonScreens/SplashScreen';
import RoleScreen from './screens/commonScreens/RoleScreen';
import CaretakerSignIn from './screens/caretakerScreens/CaretakerSignIn';
import CaretakerSignUp from './screens/caretakerScreens/CaretakerSignUp';
import SignIn from './screens/userScreens/UserSignIn';
import Onboarding3 from './screens/caretakerScreens/Onboarding3';
import Onboarding1 from './screens/caretakerScreens/Onboarding1';
import Onboarding2 from './screens/caretakerScreens/Onboarding2';


LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {

  return (
   <Onboarding2/>
  );
};

export default App;
