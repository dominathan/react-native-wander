import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { email } from 'react-native-communications';

export class Help extends Component {
  contact() {
    email('help@rayka-app.com', null, null, null, null);
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  }
});
