import React, { Component } from 'react';
import { ScrollView, ListView, View, StyleSheet } from 'react-native';
import { GroupDetail } from './GroupDetail';

export class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderGroups = this.renderGroups.bind(this);
  }

  renderGroups(group) {
    return (
      <GroupDetail group={group} />
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <ListView
         dataSource={this.props.groups}
         renderRow={this.renderGroups}
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
    marginLeft: 15
  }
});
