import React, { Component } from 'react';
import { ListView, View, Text, Image, ScrollView } from 'react-native';

export class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      feed: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
    this.renderFeed = this.renderFeed.bind(this);
  }

  componentWillMount() {
    const ds = this.state.dataSource.cloneWithRows(this.props.feed);
    this.setState({
      feed: ds
    });
  }

  renderFeed(feed) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: feed.user.photo_url }} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${feed.user.first_name} added ${feed.place.name}`}
          </Text>
          <Text style={styles.text}>
            {`${feed.comment}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <ListView
         style={styles.container}
         dataSource={this.state.feed}
         renderRow={this.renderFeed}
        />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textContainer: {
    flexDirection: 'column'
  }
};
