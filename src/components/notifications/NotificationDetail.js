import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { acceptJoinGroupRequest } from '../../services/apiActions';

export class NotificationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.acceptJoinGroupRequest = this.acceptJoinGroupRequest.bind(this);
  }

  acceptJoinGroupRequest(user) {
    const groupAndUser = {
      user_id: user.id,
      group_id: user.group_id
    };

    acceptJoinGroupRequest(groupAndUser)
      .then(data => console.log("SUCCESS", data))
      .catch(err => console.log("ERR", err))
  }

  render() {
    const { notification } = this.props;
    return (
      <View style={styles.userItem}>
        <Image source={{ uri: notification.photo_url || null }} style={styles.photo} />
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => Actions.profile({user: notification})}>
            <Text style={styles.text}>
              {`${notification.first_name} ${notification.last_name}`}
            </Text>
            <Text style={styles.joinGroupText}>
              would like to join your group.
            </Text>

          </TouchableOpacity>


          <TouchableOpacity>
            <Button
              buttonStyle={styles.acceptJoinGroupRequestButton}
              title="JOIN"
              icon={{name: 'add', color: '#4296CC'}}
              backgroundColor='#FFF'
              color='#4296CC'
              borderRadius={1}
              onPress={() => this.acceptJoinGroupRequest(notification)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userItem: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 7,
    marginBottom: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 3,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 16,
    color: '#4296CC',
    fontWeight: '500'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  joinGroupText: {
    color: "gray",
    fontSize: 12,
  },
  acceptJoinGroupRequestButton: {
    borderWidth: 1,
    borderColor: '#4296CC',
  },
  acceptJoinPlus: {
    color: '#4296CC',
    backgroundColor: '#4296CC'
  }
});
