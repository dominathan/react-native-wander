import React, { Component } from 'react';
import { ScrollView, ListView, View, StyleSheet } from 'react-native';
import { NotificationDetail } from './NotificationDetail';

export class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderNotifications = this.renderNotifications.bind(this);
  }

  renderNotifications(notification) {
    return (
      <NotificationDetail notification={notification} />
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <ListView
         dataSource={this.props.notifications}
         renderRow={this.renderNotifications}
         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
