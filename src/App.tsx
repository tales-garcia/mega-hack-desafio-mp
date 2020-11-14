import React from 'react';
import 'react-native-gesture-handler';
import {
  StatusBar,
} from 'react-native';
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes/>
    </>
  );
};

export default App;
