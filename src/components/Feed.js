import React, { Component } from 'react';
import { ListView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';


export class Feed extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      feed: ds.cloneWithRows(props.feed)
    };
    this.renderFeed = this.renderFeed.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleBeenThere = this.handleBeenThere.bind(this);
  }

  renderFeed(feed) {
    return (
      <ListItem
       roundAvatar
       title={`${feed.user.first_name} added ${feed.place.name}`}
       titleStyle={styles.titleStyle}
       subtitle={
         <View style={styles.subtitleView}>
           <Text style={styles.textComment}>
             {feed.comment}
           </Text>
           <View style={styles.likeAndBeen}>
             <TouchableOpacity onPress={() => this.handleLike(feed.place)}><Text style={styles.likeButton}>Like</Text></TouchableOpacity>
             <TouchableOpacity onPress={() => this.handleBeenThere(feed.place)}><Text style={styles.beenButton}>Been there</Text></TouchableOpacity>
           </View>
         </View>
       }
       hideChevron={true}
       avatar={{uri: feed.user.photo_url}}
       avatarStyle={styles.avatarStyle}
     />
    );
  }

  handleLike() {

  }

  handleBeenThere() {
    
  }

  render() {
    return (
      <ListView
       dataSource={this.state.feed}
       renderRow={this.renderFeed}
       renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
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
    fontWeight: '100',
    flexWrap: 'wrap',
    paddingLeft: 10
  },
  likeAndBeen: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10
  },
  likeButton: {
    color: 'gray'
  },
  beenButton: {
    color: 'gray',
    marginLeft: 45
  },
  titleStyle: {
    fontWeight: '600',
    fontFamily: 'Helvetica'
  },
  avatarStyle: {
    width: 45,
    height: 45,
    borderRadius: 20
  }

});
