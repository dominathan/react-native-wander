// 1. Import library to help create a comment.
import React from 'react';
import { AppRegistry, View } from 'react-native';

import Header from './src/components/header';
// import { GooglePlaces } from './src/components/GooglePlaces';
import { GoogleMap } from './src/components/GoogleMap';
// import Login from './src/components/Login';

// 2. Create a Component
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerText={'WanderApp'} />
      <GoogleMap />
    </View>
  );
};

// 3. Render component to device.
AppRegistry.registerComponent('albums', () => App);
