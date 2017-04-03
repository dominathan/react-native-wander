import React, { Component } from 'react';
import { ScrollView, ListView, View, StyleSheet } from 'react-native';
import { PlaceDetail } from './PlaceDetail';

export class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderPlaces = this.renderPlaces.bind(this);
  }

  renderPlaces(place) {
    return (
      <PlaceDetail place={place} />
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <ListView
         dataSource={this.props.places}
         renderRow={this.renderPlaces}
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
