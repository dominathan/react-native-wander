import React from 'react';
import { View, StyleSheet } from 'react-native';

import { getFriends, getRequestedFriends } from '../../services/apiActions';
import Button from '../Button';

const loadFriends = () => {

};

const getRequestedFriendsList = () => {
  getRequestedFriends()
    .then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        searching: false,
        pendingFriend: true
      });
    })
    .catch(err => console.error('NO SEARACH', err));
};

const FriendsButtons = (props) => {
  const { getRequestedFriendsList, getFriends } = props;
  return (
    <View style={styles.friendButtons}>
      <Button onPress={() => getFriends()}>
        Friends
      </Button>
      <Button onPress={() => console.log('bleh')}>
        Find friends
      </Button>
      <Button onPress={() => getRequestedFriendsList()}>
        Pending Requests
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  friendButtons: {
    flexDirection: 'row',
    height: 45,
    alignSelf: 'flex-end'
  },
});

export default FriendsButtons;
