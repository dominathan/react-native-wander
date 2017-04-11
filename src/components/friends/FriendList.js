import React, { Component } from 'react';
import { ScrollView, ListView, View, StyleSheet } from 'react-native';
import { FriendDetail } from './FriendDetail';

export class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFriends: true,
      searching: false,
      pendingFriend: false
    };
    this.renderFriends = this.renderFriends.bind(this);
  }

  renderFriends(friend) {
    return (
      <FriendDetail friend={friend} isGroup={this.props.isGroup} />
    );
  }

  render() {
    return (
      <ListView
       style={styles.scrollView}
       dataSource={this.props.friends}
       renderRow={this.renderFriends}
       renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 15
  },
});
