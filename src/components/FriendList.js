import React, { Component } from 'react';
import { ScrollView } from 'react-native';

// Make a Component
class FriendList extends Component {
  state = { friends: [] };

  componentWillMount() {
  }

  renderFriends() {
    return this.state.friends.map(friend => {
      return <FriendDetail friend={friend} key={friend.name} />;
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderFriends()}
      </ScrollView>
    );
  }
}
// Make the component available to other parts of the app
export default FriendList;
