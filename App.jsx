import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation/AppNavigation';
import LoginProvider from './context/LoginProvider';
LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  return (
    <NavigationContainer>
      <LoginProvider>
        <AppNavigation />
      </LoginProvider>
    </NavigationContainer>
  );
};

export default App;