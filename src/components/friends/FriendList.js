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
      <ScrollView style={styles.scrollView}>
        <ListView
         dataSource={this.props.friends}
         renderRow={this.renderFriends}
         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  friendItem: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 7,
    marginBottom: 5
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 5,
    flexDirection: 'row'
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4296CC',
    fontWeight: '500'
  },
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
  checkbox: {
    alignSelf: 'flex-end'
  }
});
