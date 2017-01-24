// 1. Import library to help create a comment.
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';


// 2. Create a Component
const WanderApp = () => {
    return (
      <App />
    );
};

// 3. Render component to device.
AppRegistry.registerComponent('albums', () => WanderApp);
