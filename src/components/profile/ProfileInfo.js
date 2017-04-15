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

  setCurrentUser() {
    AsyncStorage.getItem('user', (err, user) => {
      this.setState({user: JSON.parse(user).user });
    });
  }

  render() {
    if (this.state.user === undefined) {
      return (null);
    } else {
      const user = this.state.user;
      console.log(user)
      return (
        <View style={styles.container}>
            <FormLabel>Name</FormLabel>
            <FormInput
              onChangeText={(text) => {
                this.setState({ user.first_name: text })}
              }
              value={user.first_name} />
          { user.expert &&
            <View style={styles.fieldView}>
              <FormLabel>Blog</FormLabel>
              <FormInput textInputRef={user.blog} />
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
