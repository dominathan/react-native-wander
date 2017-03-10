import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { searchForFriends } from '../../services/apiActions';

export class FriendSearch extends Component {
  static defaultProps = {
    placeholder: 'Search For Friends',
    placeholderTextColor: '#A8A8A8',
    autoFocus: false,
  }
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      searching: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
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


  render() {
    return (
      <TextInput
        autoFocus={this.props.autoFocus}
        style={styles.textInput}
        onChangeText={this.handleTextChange}
        value={this.state.text}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        clearButtonMode='while-editing'
      />
    );
  }
}

const styles = StyleSheet.create({
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
});

export default FriendSearch;
