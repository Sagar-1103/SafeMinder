import React from 'react';
import {LogBox, Text, TouchableOpacity, View} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);


const App = () => {

  return (
    <View>
      <TouchableOpacity>
        <Text>Hello</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
