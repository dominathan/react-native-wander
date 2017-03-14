// 1. Import library to help create a comment.
import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import { GooglePlaces } from './components/GooglePlaces';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Friends } from './components/friends/Friends';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { Profile } from './components/Profile';
import { Group } from './components/Group';
import { CreateGroup } from './components/CreateGroup';
import SimpleDrawer from './SimpleDrawer';

// 2. Create a Component
class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#3c95cd' }} titleStyle={{ color: '#FFF' }}>
        <Scene key='drawer' component={SimpleDrawer} >
          <Scene key='main' tabs={false}>
            <Scene key="home" component={Home} initial title="Home" />
            <Scene key="googlePlaces" component={GooglePlaces} title="Add a Place" />
            <Scene key="friends" component={Friends} title="Friends" />
            <Scene key="login" component={Login} title="Login" />
            <Scene key="notifications" component={Notifications} title="Notifications" />
            <Scene key="settings" component={Settings} title="Settings" />
            <Scene key="help" component={Help} title="Help" />
            <Scene key="profile" component={Profile} title="Profile" />
            <Scene key="groups" component={Group} title="Groups" />
            <Scene key="createGroup" component={CreateGroup} title="Create a Group" />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
