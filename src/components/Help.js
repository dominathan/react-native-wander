import React, { Component } from 'react';
import { View } from 'react-native';

import Button from './Button';

export class Help extends Component {
  contact() {
      console.log('Contact');
  }

  renderFAQ() {
      console.log('FAQ');
  }

  render() {
    return (
      <View>
        <Button onPress={this.renderFAQ()}>`Browse FAQ's`</Button>
        <Button onPress={this.contact()}>Contact Us</Button>
      </View>
    );
  }
}