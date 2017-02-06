// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Auth0Lock from 'react-native-lock';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../config/auth0';
import { API_BASE } from '../../config/apiBase';

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
      closable: true
    }, ((err, profile, token) => {
        if (err) {
          console.log(err);
          return;
        }
        this.handleLoginSuccess(profile, token);
      })
    );
  }

  handleLoginSuccess(profile, token) {
    //send profile to API and verify token
    fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${token.idToken}`
      },
      body: JSON.stringify({
        user: this.parseProfile(profile)
      })
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
    return (
      <TouchableOpacity onPress={this.showLock}>
        <Text> Log In </Text>
      </TouchableOpacity>
    );
  }
}
