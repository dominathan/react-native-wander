import React, { Component } from 'react';
import { ListView, View, Text, Image, ScrollView } from 'react-native';

import { GoogleMap } from './GoogleMap'; 

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

  }

  renderFeed() {

  }

  render() {
    return (
      <View>
        <Text>My Profile</Text>
      </View>
    );
  }
}

const styles = {
  // container: {
  //   flex: 1,
  //   padding: 4,
  //   flexDirection: 'row',
  // },
  // text: {
  //   marginLeft: 8,
  //   fontSize: 16,
  // },
  // photo: {
  //   height: 40,
  //   width: 40,
  //   borderRadius: 20,
  // },
  // textContainer: {
  //   flexDirection: 'column'
  // }
};
