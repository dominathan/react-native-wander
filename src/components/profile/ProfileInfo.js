import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, View } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { updateUser } from '../../services/apiActions';

export class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
    this.setCurrentUser();
  }

  setCurrentUser() {
    AsyncStorage.getItem('user', (err, user) => {
      this.setState({user: JSON.parse(user).user });
    });
  }

  submit() {
    Alert.alert(
      'Update user settings',
      'Are you sure you want to update?',
      [
        {
          text: 'Cancel',
          onPress: () => { return }
        },
        {
          text: 'Ok',
          onPress: () => {
            updateUser(this.state.user)
              .then(() => {
                return AsyncStorage.setItem('user', JSON.stringify(this.state.user));
              })
              .then(() => {
                Actions.settings({type: 'reset'});
              })
              .catch(error => {
                console.log('FUCK: ', error);
              });
          }
        }
      ]
    );
  }

  render() {
    if (this.state.user === undefined) {
      return (null);
    } else {
      let user = this.state.user;
      console.log(user)
      return (
        <View style={styles.container}>
            <FormLabel>First Name</FormLabel>
            <FormInput
              onChangeText={(text) => {
                user.first_name = text;
                this.setState({ user: user })
              }}
              value={user.first_name} />
            <FormLabel>Last Name</FormLabel>
            <FormInput
              onChangeText={(text) => {
                user.last_name = text;
                this.setState({ user: user })
              }}
              value={user.last_name} />
          { user.expert &&
            <View style={styles.fieldView}>
              <FormLabel>Blog</FormLabel>
              <FormInput
                onChangeText={(text) => {
                  user.expert_blog_log = text;
                  this.setState({ user: user })
                }}
                value={user.expert_blog_log}
              />
            </View>
          }
          <Button
            buttonStyle={styles.button}
            raised
            backgroundColor='#3c95cd'
            icon={{ name: 'check', type: 'font-awesome' }}
            title="Submit"
            onPress={() => { this.submit() }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  },
  container: {
    flex: 1,
    marginTop: 60
  },
  fieldView: {
    height: 40
  }
});
