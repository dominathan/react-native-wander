// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, ListView, Image, StyleSheet } from 'react-native';
import { getFriends, acceptFriend } from '../../services/apiActions';
import FriendsButtons from './friendsButtons';
import { FriendSearch } from './FriendSearch';
import { FriendList } from './FriendList';

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
    this.handleFriendSearch = this.handleFriendSearch.bind(this);
  }

  componentWillMount() {
    this.loadFriends();
  }

  loadFriends() {
    getFriends()
      .then((friends) => {
        if(friends.length > 0) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(friends),
            loadingFriends: false,
            pendingFriend: false,
            search: false
          });
        }
      })
      .catch((err) => console.error('NO FRIENDS!!!', err));
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

  handleFriendSearch(friends) {
    console.log("INPARENT", friends);
    let friendList = friends.map((friend) => {
      friend.search = true
      return friend;
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(friends),
      loadingFriends: false,
      pendingFriend: false,
      search: false
    })
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
        <FriendSearch giveBackFriend={this.handleFriendSearch}/>
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
