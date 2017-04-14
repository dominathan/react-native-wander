import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { email } from 'react-native-communications';
import { Actions } from 'react-native-router-flux';

export class Help extends Component {
  contact() {
    email('landon@rayka-app.com', null, null, null, null);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
          raised
          backgroundColor='#3c95cd'
          icon={{ name: 'envelope', type: 'font-awesome' }}
          title="Contact Us" 
          onPress={this.contact()} 
        />
        <Button 
          raised
          backgroundColor='#3c95cd'
          icon={{ name: 'arrows', type: 'font-awesome' }}
          title="Onboarding" 
          onPress={Actions.onboarding()} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  }
});
