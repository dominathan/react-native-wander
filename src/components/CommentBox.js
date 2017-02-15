import React, { Component } from 'react';
import { TextInput, View, Text, AsyncStorage } from 'react-native';
import Button from './Button';
import { addPlaceToFavorite } from '../services/apiActions';

// Make a Component
export class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._savePlace = this._savePlace.bind(this);
  }

  _savePlace(place) {
    const parsedPlace = {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      google_id: place.id,
      google_place_id: place.place_id,
      comment: this.state.text
    };
    this.saveChosenPlaceAsFavorite(parsedPlace);
  }

  saveChosenPlaceAsFavorite(place) {
    const comment = this.state.text;
    AsyncStorage.getItem('user', (err, user) => {
      if (err) {
        return err;
      }
      addPlaceToFavorite({ place: place, user: JSON.parse(user), comment: comment })
        .then((res) => console.log('SAVED PLACE', res))
        .catch((error) => console.log('Failed Saving Place: ', error));
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>{this.props.place.name}</Text>
        <View style={styles.buttonStyle}>
          <Button>Add Photo</Button>
        </View>
        <TextInput
          style={styles.textStyle}
          placeholder="Write something about this place."
          onChangeText={(text) => {
            this.setState({text});
          }}
          value={this.state.text}
        />
        <View style={styles.buttonStyle}>
          <Button onPress={() => this._savePlace(this.props.place)}>Post</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 20,
    color: 'black',
    margin: 20,
    borderWidth: 2,
    borderColor: 'black',
    height: 35
  },
  viewStyle: {
    flex: 1,
    height: 50,
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};
