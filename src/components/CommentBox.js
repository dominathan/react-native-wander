import React, { Component } from 'react';
import { TextInput, View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import { addPlaceToFavorite } from '../services/apiActions';

// Make a Component
export class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      favorite: false
    };
    this.savePlace = this.savePlace.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  savePlace(place) {
    const parsedPlace = {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      google_id: place.id,
      google_place_id: place.place_id,
      comment: this.state.text,
      favorite: this.state.favorite
    };
    this.saveChosenPlaceAsFavorite(parsedPlace);
  }

  handleTextChange(text) {
    this.setState({ text });
  }

  toggleFavorite() {
    this.setState({
      favorite: !this.state.favorite
    });
  }

  saveChosenPlaceAsFavorite(place) {
    const { favorite, text } = this.state;
    AsyncStorage.getItem('user', (err, user) => {
      if (err) {
        return err;
      }
      addPlaceToFavorite({ place: place, user: JSON.parse(user), comment: text, favorite: favorite })
        .then((res) => console.log('SAVED PLACE', res))
        .catch((error) => console.log('Failed Saving Place: ', error));
    });
  }

  render() {
    const {place} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.placeToAdd}>
          <Text style={styles.placeToAddText}>{place.name}</Text>
          <TouchableOpacity style={styles.addFavorite} onPress={this.toggleFavorite}>
            <Text style={styles.addFavoriteText}>Add as Favorite</Text>
            {
              !this.state.favorite ?
              <Icon
                style={styles.star}
                name='star-border'
              />
              :
              <Icon name="star"
                style={styles.star}
                color='yellow'
              />
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addPhotoContainer}>
          <Icon
            name='add-circle-outline'
            color='#4296CC'
          />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.textStyle}
            placeholder="Write something about this place."
            onChangeText={this.handleTextChange}
            value={this.state.text}
            autoFocus={true}
            multiline={true}
          />
        </View>
        <Button
         raised
         title='Add Place'
         backgroundColor='#4296CC'
         onPress={() => this.savePlace(place)}
         />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  placeToAdd: {
    flexDirection: 'row',
    paddingTop: 10,
    height: 40,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray'
  },
  placeToAddText: {
    marginLeft: 15
  },
  star: {
    position: 'absolute',
    top: 1
  },
  addFavorite: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    marginTop: 10
  },
  addFavoriteText: {
    color: '#4296CC',
    marginLeft: 10
  },
  addPhotoContainer: {
    height: 40,
    flexDirection: 'row',
    marginLeft: 15,
  },
  addPhotoText: {
    alignSelf: 'center',
    marginLeft: 10,
    color: '#4296CC'
  },
  textStyle: {
    fontSize: 15,
    margin: 15,
    color: 'black',
    alignSelf: 'stretch',
    height: 200,
    textAlignVertical: 'top'
  },
  commentContainer: {
    height: 200,
    alignItems: 'flex-start',
  },
  buttonStyle: {

  }
};
