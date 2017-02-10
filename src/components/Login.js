// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { TouchableOpacity, Text, AsyncStorage } from 'react-native';
import Auth0Lock from 'react-native-lock';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../config/auth0';
import { loginUser } from '../services/apiActions';

const lock = new Auth0Lock({
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN
});

export class Login extends Component {

  componentDidMount() {
    this.showLock();
  }

  showLock() {
    lock.show({
      closable: true,
      authParams: {
        scope: 'openid email profile'
      }
    }, ((err, profile, token) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("TOKEN BACK? ", token);
        console.log("PROFILE BACK ", profile);
        AsyncStorage.setItem('token', JSON.stringify(token), () => {
          this.handleLoginSuccess(profile);
        });
      })
    );
  }

  handleLoginSuccess(profile) {
    //send profile to API and verify token
    loginUser({ user: this.parseProfile(profile) })
    .then((res) => AsyncStorage.setItem('user', JSON.stringify(res)))
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
    return (
      <TouchableOpacity onPress={this.showLock}>
        <Text> Log In </Text>
      </TouchableOpacity>
    );
  }
}
