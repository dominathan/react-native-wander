// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, Text, AsyncStorage, TextInput, ListView, Image } from 'react-native';
import { getFriends, searchForFriends } from '../services/apiActions';


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
      dataSource: ds.cloneWithRows(['row1', 'row2'])
    };
    this.renderFriends = this.renderFriends.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    this.loadFriends();
  }

  handleTextChange(text) {
    this.searchForFriendsToAdd(text);
    this.setState({ text });
  }

  searchForFriendsToAdd(text) {
    searchForFriends(`name=${text}`)
      .then((data) => console.log('FRIENDS SEARCH', data))
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={this.props.autoFocus}
          style={styles.textInput}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          clearButtonMode="while-editing"
        />
        <ListView
         style={styles.friendContainer}
         dataSource={this.state.dataSource}
         renderRow={this.renderFriends}
        />
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
    marginTop: 7
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
    flexDirection: 'column'
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
};
