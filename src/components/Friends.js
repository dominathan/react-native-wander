// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, AsyncStorage, TextInput, ListView, Image } from 'react-native';

import { getFriends, searchForFriends, addFriend } from '../services/apiActions';
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
      searching: false
    };
    this.renderFriends = this.renderFriends.bind(this);
    this.renderFriendSearch = this.renderFriendSearch.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addFriendToDatabase = this.addFriendToDatabase.bind(this);
  }

  componentDidMount() {
    this.loadFriends();
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
          searching: true
        });
      })
      .catch(err => console.error('NO SEARACH', err));
  }

  loadFriends() {
    getFriends()
      .then((friends) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(friends), loadingFriends: false
        });
      })
      .catch((err) => console.error('NO FRIENDS!!!', err));
  }

  addFriendToDatabase(friend) {
    addFriend(friend)
      .then((res) => console.log('added friend', res))
      .catch((err) => console.error('NO ADD FRIEND', err));
  }

  renderFriends(friend) {
    return (
      <View style={styles.friendContainer}>
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
      <View style={styles.friendContainer}>
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

  render() {
    const searching = this.state.searching;
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
        { !searching && <ListView
         style={styles.friendContainer}
         dataSource={this.state.dataSource}
         renderRow={this.renderFriends}
        /> }
        { searching && <ListView
         style={styles.friendContainer}
         dataSource={this.state.dataSource}
         renderRow={this.renderFriendSearch}
        /> }


      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 62
  },
  friendContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 7,
    height: 20
  },
  text: {
    color: 'black',
    fontSize: 20
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textInput: {
    backgroundColor: '#dee2e8',
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
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
};
