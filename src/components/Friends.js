// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, ListView, Image, StyleSheet } from 'react-native';
import { getFriends, addFriend, acceptFriend } from '../services/apiActions';
import Button from './Button';
import FriendsButtons from './friends/friendsButtons';
import { FriendSearch } from './friends/FriendSearch';
import { FriendList } from './friends/FriendList';

export class Friends extends Component {

  constructor(props) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    super(props);
    this.state = {
      loadingFriends: true,
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      searching: false,
      pendingFriend: false
    };
    this.renderFriendSearch = this.renderFriendSearch.bind(this);
    this.addFriendToDatabase = this.addFriendToDatabase.bind(this);
  }

  componentWillMount() {
    this.loadFriends();
  }

  loadFriends() {
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
  }

  addFriendToDatabase(friend) {
    addFriend(friend)
      .then((resp) => console.log('ADDED FRIEND', resp))
      .catch((err) => console.error('NO ADD FRIEND', err));
  }

  renderFriendSearch(friend) {
    const friendToAdd = friend;
    return (
      <View style={styles.friendItem}>
        <Image source={{ uri: friend.photo_url }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${friend.first_name} ${friend.last_name}`}
          </Text>
          <Button onPress={() => this.addFriendToDatabase(friendToAdd)}>
            Add friend
          </Button>
        </View>
      </View>
    );
  }

  renderRequestedFriends(friend) {
    return (
      <View style={styles.friendItem}>
        <Image source={{ uri: friend.photo_url }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${friend.first_name} ${friend.last_name}`}
          </Text>
          <Button
            onPress={() => acceptFriend(friend)
                            .then((resp) => console.log('ADDED FRIEND', resp))
                            .catch((err) => console.error('NO ADD FRIEND', err))
         }>
            Add friend
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const { loadingFriends, dataSource } = this.state;
    return (
      <View style={styles.container}>
        <FriendSearch />
        { !loadingFriends && <FriendList friends={dataSource} /> }

        <FriendsButtons />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 62,
    alignItems: 'stretch'
  },

});
