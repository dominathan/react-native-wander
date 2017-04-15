import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
    this.setCurrentUser();
  }

  // users/:id PUT route

  setCurrentUser() {
    AsyncStorage.getItem('user', (err, user) => {
      this.setState({user: JSON.parse(user).user });
    });
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
                console.log('state', this.state.user)
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
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  fieldView: {
    height: 40
  }
});
