import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

export default class FriendsButtons extends Component{
  constructor() {
    super()
    this.state = {
      selectedTab: 'profile',
    }
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  render() {

    return (
      <View></View>
    );
  }
};

const styles = StyleSheet.create({
  friendButtons: {
    flexDirection: 'row',
    height: 45,
    alignSelf: 'flex-end'
  },
});
