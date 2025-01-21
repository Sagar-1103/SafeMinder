import React from 'react';
import {LogBox} from 'react-native';
import FitComponent from './components/Fit';
LogBox.ignoreLogs(['new NativeEventEmitter']);


const App = () => {

  return (
   <FitComponent/>
  );
};

export default App;
