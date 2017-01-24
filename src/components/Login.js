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

  componentWillMount() {

  }

  showLock() {
    lock.show({
      closable: true
    }, ((err, profile, token) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('COMING IN', JSON.stringify(profile));
      })
    );
  }

  render() {
    return (
      <TouchableOpacity style={styles.signupContainer} onPress={this.showLock}>
        <Text> Log In </Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  signupContainer: {
    marginTop: 100,
    height: 50,
    width: null,
    flex: 1
  }
};
