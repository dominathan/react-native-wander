import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity } from 'react-native';

import { getFriends, createGroup } from '../../services/apiActions';
import { FriendList } from '../friends/FriendList';

export class CreateGroup extends Component {

  static defaultProps = {
    placeholder: 'Enter a Group Name',
    placeholderTextColor: '#8D8F90',
    autoFocus: false,
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      text: '',
      loadingFriends: true,
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      private: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.createThisGroup = this.createThisGroup.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
  }

  componentWillMount() {
    this.loadFriends();
  }

  createThisGroup() {
    const group = {
      groupName: this.state.text,
      friends: this.state.dataSource._dataBlob.s1.filter((friend) => friend.invited),
      private: this.state.private
    };
    createGroup(group)
      .then((data) => console.log('GOT DATA', data))
      .catch((err) => console.error('NO CREATION', err));
  }

  loadFriends() {
    getFriends()
      .then((friends) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(friends),
          loadingFriends: false,
        });
      })
      .catch((err) => console.error('NO FRIENDS!!!', err));
  }


  handleTextChange(text) {
    this.setState({ text });
  }

  togglePrivate() {
    this.setState({
      private: !this.state.private
    })
  }

  render() {
    const { dataSource, loadingFriends } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.publicPrivateContainer}>
          <TouchableOpacity style={styles.privatePress} onPress={this.togglePrivate}>
            <Text style={this.state.private ? styles.pubPriv : styles.pubPrivSelected}>PUBLIC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privatePress} onPress={this.togglePrivate}>
            <Text style={!this.state.private ? styles.pubPriv : styles.pubPrivSelected}>PRIVATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.publicPrivateContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleTextChange}
            value={this.state.text}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            clearButtonMode='while-editing'
          />
        </View>

        { !loadingFriends && <FriendList friends={dataSource} isGroup={true} /> }

        <TouchableOpacity onPress={this.createThisGroup} style={styles.createGroup}>
          <Text style={styles.buttonText}>Create!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publicPrivateContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 45,
    justifyContent: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#8D8F90',
  },
  pubPriv: {
    marginRight: 25,
    marginLeft: 25,
    alignSelf: 'center'
  },
  pubPrivSelected: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    alignSelf: 'center',
    marginRight: 25,
    marginLeft: 25,
  },
  createGroup: {
    height: 40,
    width: 270,
    alignSelf: 'center',
    backgroundColor: '#4296CC',
    borderRadius: 20,
    marginBottom: 50
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  textInput: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 8,
    fontSize: 15,
    alignSelf: 'stretch'
  },
  privatePress: {
    alignSelf: 'center'
  }
});
