// 1. Import library to help create a comment.
import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { StatusBar } from 'react-native';

import { GooglePlaces } from './components/GooglePlaces';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Friends } from './components/friends/Friends';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { Profile } from './components/profile/Profile';
import { Group } from './components/groups/Group';
import { CreateGroup } from './components/groups/CreateGroup';
import { GroupSearch } from './components/groups/GroupSearch';
import SimpleDrawer from './SimpleDrawer';

// 2. Create a Component
class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    StatusBar.setBarStyle('light-content');
  }

  render() {
      return (
          <Router navigationBarStyle={{ backgroundColor: '#3c95cd' }} titleStyle={{ color: '#FFF' }}>
            <Scene key='drawer' component={SimpleDrawer} >
              <Scene key='main' tabs={false}>
                <Scene key="home" component={Home} title="Home" />
                <Scene key="googlePlaces" component={GooglePlaces} title="Add a Place" />
                <Scene key="friends" component={Friends} title="Friends" />
                <Scene key="login" component={Login} title="Login" />
                <Scene key="notifications" component={Notifications} title="Notifications" />
                <Scene key="settings" component={Settings} title="Settings" />
                <Scene key="help" component={Help} title="Help" />
                <Scene key="profile" component={Profile} title="Profile" />
                <Scene key="groups" component={Group} title="Groups" onRight={() => Actions.searchGroup()} rightTitle="Search" titleStyle={{ color: "#FFF"}} initial />
                <Scene key="createGroup" component={CreateGroup} title="Create a Group" />
                <Scene key='searchGroup' component={GroupSearch} title="Search for Groups" />
              </Scene>
            </Scene>
          </Router>
      );
    }
  }

export default App;
