// 1. Import library to help create a comment.
import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { AsyncStorage, StatusBar } from 'react-native';

import { Home } from './components/Home';
import SimpleDrawer from './SimpleDrawer';

// Places
import { GooglePlaces } from './components/places/GooglePlaces';
import { MyPlaces } from './components/places/MyPlaces';

import { Login } from './components/Login';
import { Onboarding } from './components/onboarding/Onboarding';
import { Friends } from './components/friends/Friends';
import { Notifications } from './components/notifications/Notifications';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { Profile } from './components/profile/Profile';
import { ProfileInfo } from './components/profile/ProfileInfo';

// Groups
import { Group } from './components/groups/Group';
import { CreateGroup } from './components/groups/CreateGroup';
import { GroupSearch } from './components/groups/GroupSearch';
import { GroupProfile } from './components/groups/GroupProfile';
import { AddFriends } from './components/groups/AddFriends';

// 2. Create a Component
class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content');
    this.state = {
      isLoggedIn: undefined
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
    this.handleAddFriends = this.handleAddFriends.bind(this);
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
    this.getIsLoggedIn = this.getIsLoggedIn.bind(this);
  }

  getIsLoggedIn() {
    return this.state.isLoggedIn;
  }

  setIsLoggedIn(val) {
    this.setState({ isLoggedIn: val });
  }

  handleAddFriends(state) {
    Actions.addFriends({ group: state.group });
  }

  render() {
      if (this.state.isLoggedIn === undefined) {
        return (null);
      } else {
        return (
          <Router navigationBarStyle={{ backgroundColor: '#3c95cd' }} titleStyle={{ color: '#FFF' }} getIsLoggedIn={this.getIsLoggedIn} setIsLoggedIn={this.setIsLoggedIn}>
            <Scene key='drawer' component={SimpleDrawer} >
              <Scene key='main' tabs={false}>
                <Scene key='launch' >
                  <Scene key='login' component={Login} title="Login" hideNavBar initial />
                </Scene>
                <Scene key="home" component={Home} title="Home" />
                <Scene key="myPlaces" component={MyPlaces} title="Places" />
                <Scene key="googlePlaces" component={GooglePlaces} title="Add a Place" />
                <Scene key="friends" component={Friends} title="Friends" />
                <Scene key="notifications" component={Notifications} title="Notifications"  />
                <Scene key="settings" component={Settings} title="Settings" />
                <Scene key="help" component={Help} title="Help" />
                <Scene key="profile" component={Profile} title="Profile" />
                <Scene key="groups" component={Group} title="Groups" onRight={() => Actions.searchGroup()} rightTitle="Search" titleStyle={{ color: "#FFF" }} />
                <Scene key="createGroup" component={CreateGroup} title="Create a Group" />
                <Scene key='searchGroup' component={GroupSearch} title="Search for Groups" />
                <Scene key='groupProfile' component={GroupProfile} title="Group" onRight={(state) => this.handleAddFriends(state)} rightTitle="+ Friend" />
                <Scene key='addFriends' component={AddFriends} title='Add to Group' />
                <Scene key='onboarding' component={Onboarding} title='Onboarding' hideNavBar />
                <Scene key='profileInfo' component={ProfileInfo} title='Profile Info' />
              </Scene>
            </Scene>
          </Router>
        );
      }
  }

}

export default App;
