// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, ListView, Image, StyleSheet } from 'react-native';
import { getFriends, acceptFriend, getRequestedFriends } from '../../services/apiActions';
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
    this.handleFriendSearch = this.handleFriendSearch.bind(this);
    this.getRequestedFriendsList = this.getRequestedFriendsList.bind(this);
    this.loadFriends = this.loadFriends.bind(this);
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

  handleFriendSearch(friends) {
    let friendList = friends.map((friend) => {
      friend.search = true;
      return friend;
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(friendList),
      loadingFriends: false,
      pendingFriend: false,
      search: false
    })
  }

  getRequestedFriendsList() {
    getRequestedFriends()
      .then((data) => {
        const friendList = data.map((friend) => {
          friend.pending = true;
          return friend;
        })
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(friendList),
          searching: false,
          pendingFriend: true
        });
      })
      .catch(err => console.error('NO SEARACH', err));
  };

  render() {
    const { loadingFriends, dataSource } = this.state;
    return (
      <View style={styles.container}>
        <FriendSearch giveBackFriend={this.handleFriendSearch}/>
        { !loadingFriends && <FriendList friends={dataSource} /> }

        <FriendsButtons getRequestedFriendsList={this.getRequestedFriendsList} getFriends={this.loadFriends}/>

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
