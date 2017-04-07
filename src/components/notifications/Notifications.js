import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';

import { getNotifications } from '../../services/apiActions'

import { NotificationList } from './NotificationList'

export class Notifications extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      users: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    getNotifications()
      .then(data => {
        console.log(data)
        this.setState({users: this.state.users.cloneWithRows(data.users)})
      })
      .catch(err => console.log(err))
  }

  render() {
    const { users } = this.state
    return (
      <View style={styles.container}>
        <NotificationList notifications={users} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
})
