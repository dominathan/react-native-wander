import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';

import AlbumDetail from './AlbumDetail';
// Make a Component
class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
      axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then((response) => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    return this.state.albums.map(album => {
      return <AlbumDetail album={album} key={album.title} />;
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}
// Make the component available to other parts of the app
export default AlbumList;
