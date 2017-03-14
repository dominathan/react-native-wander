import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CheckBox from 'react-native-checkbox';
//
export class FriendDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedButton: false
    };
  }

  renderCheckBox(friend) {
    friend.invited = this.state.checkedButton;
    return (
      <CheckBox
        label=''
        checked={friend.checked}
        onChange={(checked) => {
          friend.invited = !checked;
          this.state.checkedButton = !checked;
        }}
        containerStyle={styles.checkboxContainer}
      />
    );
  }

  render() {
    const friend = this.props.friend;
    return (
      <View style={styles.friendItem}>
        <Image source={{ uri: friend.photo_url }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${friend.first_name} ${friend.last_name}`}
          </Text>

          { this.props.isGroup && this.renderCheckBox(friend) }
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
    marginBottom: 5
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 5,
    flexDirection: 'row'
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
  }
});
