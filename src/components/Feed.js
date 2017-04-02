import React, { Component } from 'react';
import { ListView, View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export class Feed extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      feed: ds.cloneWithRows(props.feed)
    };
    this.renderFeed = this.renderFeed.bind(this);
  }

  renderFeed(feed) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: feed.user.photo_url }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            <Text style={styles.bold}>{`${feed.user.first_name} ${feed.user.last_name}`}</Text>
              {` added `}
            <Text style={styles.bold}>{`${feed.place.name}`}</Text>
          </Text>
          <Text style={styles.textComment}>
            {feed.comment}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <ListView
         dataSource={this.state.feed}
         renderRow={this.renderFeed}
         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginLeft: 10,
    height: 65
  },
  text: {
    marginLeft: 14,
    fontSize: 14,
    flexWrap: 'wrap'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  bold: {
    fontWeight: '600'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  textComment: {
    marginLeft: 14,
    fontWeight: '100',
    flexWrap: 'wrap'
  }
});
