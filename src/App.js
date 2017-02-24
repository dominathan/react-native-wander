// 1. Import library to help create a comment.
import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import { GooglePlaces } from './components/GooglePlaces';
import { GoogleMap } from './components/GoogleMap';
import { Login } from './components/Login';
import { Friends } from './components/Friends';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import SimpleDrawer from './SimpleDrawer';

// 2. Create a Component
class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  render() {
    return (
      <Router navigationBarStyle={{backgroundColor: '#3c95cd'}} titleStyle={{ color: '#FFF' }}>
        <Scene key='drawer' component={SimpleDrawer} >
          <Scene key='main' tabs={false}>
            <Scene key="googleMap" component={GoogleMap} title="Google Map" initial onRight={ () => this.setState({ filterFriends: true })} rightTitle="Friends" />
            <Scene key="googlePlaces" component={GooglePlaces} title="Add a Place" />
            <Scene key="friends" component={Friends} title="Friends" />
            <Scene key="login" component={Login} title="Login" />
            <Scene key="notifications" component={Notifications} title="Notifications" />
            <Scene key="settings" component={Settings} title="Settings" />
            <Scene key="help" component={Help} title="Help" />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
