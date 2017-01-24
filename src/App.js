// 1. Import library to help create a comment.
import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import { GooglePlaces } from './components/GooglePlaces';
import { GoogleMap } from './components/GoogleMap';
import { TestScreen } from './components/TestScreen';
import SimpleDrawer from './SimpleDrawer';

// 2. Create a Component
class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  render() {
    return (
      <Router>
        <Scene key='drawer' component={SimpleDrawer} >
          <Scene key='main' tabs={false}>
            <Scene key="googleMap" component={GoogleMap} />
            <Scene key="googlePlaces" component={GooglePlaces} initial />
            <Scene key="testScreen" component={TestScreen} title="Test Screen" />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = {
  move: {
    marginTop: 200
  }
};

export default App;
