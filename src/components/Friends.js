// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, TextInput, ListView, Image, ScrollView, StyleSheet } from 'react-native';
import { getFriends, searchForFriends, addFriend, getRequestedFriends, acceptFriend } from '../services/apiActions';
import Button from './Button';

export class Friends extends Component {

  static defaultProps = {
    placeholder: 'Search For Friends',
    placeholderTextColor: '#A8A8A8',
    autoFocus: false,
  }

  constructor(props) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    super(props);
    this.state = {
      text: '',
      loadingFriends: true,
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      searching: false,
      pendingFriend: false
    };
    this.renderFriends = this.renderFriends.bind(this);
    this.renderFriendSearch = this.renderFriendSearch.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addFriendToDatabase = this.addFriendToDatabase.bind(this);
  }

  componentWillMount() {
    this.loadFriends();
  }

  getRequestedFriendsList() {
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

  handleTextChange(text) {
    this.searchForFriendsToAdd(text);
    this.setState({ text });
    if (text.length === 0) {
      this.setState({
        searching: false
      });
    }
  }

  searchForFriendsToAdd(text) {
    if (text === '') {
      return;
    }
    searchForFriends(`name=${text}`)
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          searching: true,
          pendingFriend: false
        });
      })
      .catch(err => console.error('NO SEARACH', err));
  }

  addFriendToDatabase(friend) {
    addFriend(friend)
      .then((resp) => console.log('ADDED FRIEND', resp))
      .catch((err) => console.error('NO ADD FRIEND', err));
  }

  renderFriends(friend) {
    return (
      <View style={styles.friendItem}>
        <Image source={{ uri: friend.photo_url }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${friend.first_name} ${friend.last_name}`}
          </Text>
        </View>
      </View>
    );
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
    const { searching, pendingFriend } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={this.props.autoFocus}
          style={styles.textInput}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          clearButtonMode='while-editing'
        />
        <ScrollView style={styles.scrollView}>
          { !searching && !pendingFriend && <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderFriends}
           renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          /> }
          { searching && <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderFriendSearch}
          /> }
          { pendingFriend && <ListView
             dataSource={this.state.dataSource}
             renderRow={this.renderRequestedFriends}
          /> }
          </ScrollView>


          <View style={styles.friendButtons}>
            <Button onPress={() => this.loadFriends()}>
              Friends
            </Button>
            <Button onPress={() => this.searchForFriends()}>
              Find friends
            </Button>
            <Button onPress={() => this.getRequestedFriendsList()}>
              Pending Friends
            </Button>
          </View>
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
  scrollView: {
    flex: 1,
  },
  friendButtons: {
    flexDirection: 'row',
    height: 45,
    alignSelf: 'flex-end'
  },
  friendItem: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 7,
    marginBottom: 5
  },
  textInput: {
    backgroundColor: '#dee2e8',
    justifyContent: 'center',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    textAlign: 'center'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 5
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
});
