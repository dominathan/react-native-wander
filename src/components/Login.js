// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Auth0Lock from 'react-native-lock';
import { Actions } from 'react-native-router-flux';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../config/auth0';
import { loginUser } from '../services/apiActions';


const lock = new Auth0Lock({
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN
});

export class Login extends Component {

  componentDidMount() {
    if (this.props.getIsLoggedIn()) {
      Actions.home({ type: 'reset' });
    } else {
      this.showLock();
    }
  }

  showLock() {
    lock.show({
      closable: false,
      authParams: {
        scope: 'openid email profile'
      }
    }, ((err, profile, token) => {
        if (err) {
          console.log(err);
          return;
        }
        AsyncStorage.setItem('token', JSON.stringify(token), () => {
          this.handleLoginSuccess(profile);
        });
      })
    );
  }

  handleLoginSuccess(profile) {
    loginUser({ user: this.parseProfile(profile) })
      .then(res => {
        AsyncStorage.setItem('user', JSON.stringify(res));
        this.props.setIsLoggedIn(true);
        if (res.first_time) {
          return Actions.onboarding({ type: 'reset'});
        }
        Actions.home({ type: 'reset' });
      })
      .catch((err) => {
        console.log('FUCK BALLS', err);
      });
  }

  parseProfile(profile) {
    return {
      first_name: profile.extraInfo.given_name,
      last_name: profile.extraInfo.family_name,
      birthday: profile.extraInfo.birthday,
      photo_url: profile.extraInfo.picture_large,
      email: profile.email,
    };
  }

  render() {
    return (null);
  }
}
