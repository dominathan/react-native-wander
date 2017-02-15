import React, { Component } from 'react';
import { ListView, View, Text, Image, ScrollView } from 'react-native';


// Make a Component
export class Feed extends Component {

  constructor(props) {
    super(props);
    console.log(' THIS IS PROPS', props);
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
        <Text style={styles.text}>
          {`${feed.comment} for ${feed.place.name}`}
        </Text>
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
    marginLeft: 4,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  }
};
