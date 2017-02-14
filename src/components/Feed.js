import React, { Component } from 'react';
import { ListView, View, Text, Image } from 'react-native';
import { getFeed } from '../services/apiActions';


// Make a Component
export class Feed extends Component {

  constructor() {
    super();

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.feed)
    };
  }

  componentWillMount() {

  }

  render() {
    const feedReady = this.state.feedReady;
    return (
      feedReady && <ListView
       style={styles.container}
       dataSource={this.state.dataSource}
       renderRow={(data) =>
         <View style={styles.container}>
           <Image source={{ uri: data.user.photo_url}} style={styles.photo} />
           <Text style={styles.text}>
             {`${data.comment} for ${data.place.name}`}
           </Text>
        </View>
       }
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  }
};
