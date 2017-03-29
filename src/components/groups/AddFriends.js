// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import { getFriends, addFriendsToGroup } from '../../services/apiActions';
import { FriendSearch } from '../friends/FriendSearch';
import { FriendList } from '../friends/FriendList';

export class AddFriends extends Component {

  constructor(props) {
    console.log("ADD FRIEND PROPS", props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    super(props);
    this.state = {
      loadingFriends: true,
      dataSource: ds.cloneWithRows([]),
      searching: false,
    };
    this.handleFriendSearch = this.handleFriendSearch.bind(this);
    this.loadFriends = this.loadFriends.bind(this);
    this.addFriendsToGroup = this.addFriendsToGroup.bind(this);
  }

  componentWillMount() {
    this.loadFriends();
  }

  loadFriends() {
    getFriends()
      .then((friends) => {
        let friendList = friends.map((friend) => {
          friend.isGroup = true;
          return friend;
        })
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(friendList),
          loadingFriends: false,
          pendingFriend: false,
          search: false
        });
      })
      .catch((err) => console.error('NO FRIENDS!!!', err));
  }

  addFriendsToGroup(friends) {
    const filtered_friends = friends._dataBlob.s1.filter((friend) => friend.invited)
    addFriendsToGroup({friends: filtered_friends, group_id: this.props.group.id})
      .then((data) => console.log("ADDED FRIENDS TO GRUOP", data))
      .catch((err) => console.log("ERROR", err))
  }

  handleFriendSearch(friends) {
    let friendList = friends.map((friend) => {
      friend.isGroup = true;
      return friend;
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(friendList),
      loadingFriends: false,
      pendingFriend: false,
      search: false
    })
  }

  render() {
    const { loadingFriends, dataSource } = this.state;
    return (
      <View style={styles.container}>
        <FriendSearch giveBackFriend={this.handleFriendSearch}/>
        { !loadingFriends && <FriendList friends={dataSource} /> }

        <TouchableOpacity onPress={() => this.addFriendsToGroup(this.state.dataSource)} style={styles.createGroup}>
          <Text style={styles.buttonText}>Add Friends</Text>
        </TouchableOpacity>
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
  createGroup: {
    height: 40,
    width: 270,
    alignSelf: 'center',
    backgroundColor: '#4296CC',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },

});
