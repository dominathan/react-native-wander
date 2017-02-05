// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Auth0Lock from 'react-native-lock';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../config/auth0';


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
        console.log('COMING IN: ', JSON.stringify(profile));
        console.log('TOKEN: ', JSON.stringify(token));
      })
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.showLock}>
        <Text> Log In </Text>
      </TouchableOpacity>
    );
  }
}
