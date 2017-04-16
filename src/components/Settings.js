import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export class Settings extends Component {
  constructor() {
    super();
    this.state = {
      settings: [
        {
          title: "Profile Info",
          icon: {name: 'user-circle-o', type: 'font-awesome'},
          onPress: () => {
            Actions.profileInfo();
          }
        },
        {
          title: 'Logout',
          icon: {name: 'cloud', type: 'font-awesome'},
          onPress: () => {
            Alert.alert(
              'Logout',
              'Are you sure you want to log out?',
              [
                {
                  text: 'Cancel',
                  onPress: () => { return }
                },
                {
                  text: 'Ok',
                  onPress: () => {
                    AsyncStorage.removeItem('token')
                      .then(() => {
                        return AsyncStorage.removeItem('user');
                      })
                      .then(() => {
                          this.props.setIsLoggedIn(false);
                          Actions.launch({type: 'reset'});
                      });
                  }
                }
              ]
            );
          }
        }
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          {
            this.state.settings.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={item.icon}
                onPress={item.onPress}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 43
  }
});
