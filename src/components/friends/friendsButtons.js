import React from 'react';
import { View, StyleSheet } from 'react-native';

import { getFriends, getRequestedFriends } from '../../services/apiActions';
import Button from '../Button';

const loadFriends = () => {
  getFriends()
    .then((friends) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(friends),
        loadingFriends: false,
        pendingFriend: false,
        search: false
      });
    })
    .catch((err) => console.error('NO FRIENDS!!!', err));
};

const getRequestedFriendsList = () => {
  getRequestedFriends()
    .then((data) => {
      console.log('REQUSTED FRIENDS', data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        searching: false,
        pendingFriend: true
      });
    })
    .catch(err => console.error('NO SEARACH', err));
};

const FriendsButtons = () => {
  return (
    <View style={styles.friendButtons}>
      <Button onPress={() => loadFriends()}>
        Friends
      </Button>
      <Button onPress={() => console.log('bleh')}>
        Find friends
      </Button>
      <Button onPress={() => getRequestedFriendsList()}>
        Pending Friends
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
