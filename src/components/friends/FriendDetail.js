import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { addFriend, acceptFriend, declineFriend } from '../../services/apiActions';
//
export class FriendDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.addFriendToDatabase = this.addFriendToDatabase.bind(this);
    this.denyFriendRequest = this.denyFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.addToGroup = this.addToGroup.bind(this);
  }

  addFriendToDatabase(friend) {
    addFriend(friend)
      .then((resp) => console.log('ADDED FRIEND', resp))
      .catch((err) => console.error('NO ADD FRIEND', err));
  }

  goToProfile(friend) {
    Actions.profile({person: friend});
  }

  acceptFriendRequest(friend) {
    console.log("ACCEPT FRIEND", friend)
    acceptFriend(friend)
      .then((yay) => console.log("ACCEPTED", yay))
      .catch(err => console.log('nOOOOO ', err))
  }

  denyFriendRequest(friend) {
    console.log("DENIED", friend)
    declineFriend(friend)
      .then((yay) => console.log("DECLINE", yay))
      .catch(err => console.log('nOOOOO ', err))
  }

  renderCheckBox(friend) {
    return (
      <CheckBox
        checked={this.state.checked}
        onPress={ _ => {
          friend.invited = !this.state.checked
          this.setState({
            checked: !this.state.checked
          })
        }}

      />
    );
  }

  addToGroup(friend) {
    return (
      <CheckBox
        checked={this.state.checked}
        onPress={ _ => {
          friend.invited = !this.state.checked
          this.setState({
            checked: !this.state.checked
          })
          console.log("ON CHECK", friend)
        }}

      />
    );
  }

  render() {
    const friend = this.props.friend;
    return (
      <View style={styles.friendItem}>
        <Image source={{ uri: friend.photo_url || null }} style={styles.photo} />
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => this.goToProfile(friend)}>
            <Text style={styles.text}>
              {`${friend.first_name} ${friend.last_name}`}
            </Text>
          </TouchableOpacity>
          {
            friend.search &&
            <View style={styles.addFriend}>
              <Icon
              name='add'
              color='#4296CC'
              onPress={() => this.addFriendToDatabase(friend)} />
            </View>
          }

          {
            friend.pending &&
            <View style={styles.acceptFriend}>
            <Icon
              name='x'
              color='red'
              onPress={() => this.denyFriendRequest(friend)} />
              <Icon
              name='add'
              color="#4296CC"
              onPress={() => this.acceptFriendRequest(friend)} />
            </View>
          }

          { this.props.isGroup && this.renderCheckBox(friend) }
          { friend.isGroup && this.addToGroup(friend) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendItem: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 7,
    marginBottom: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4296CC',
    fontWeight: '500'
  },
  checkboxContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  addFriend: {
    position: 'relative',
    bottom: 0,
    left: 150,
  },
  acceptFriend: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  }
});
