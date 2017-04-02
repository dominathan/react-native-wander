import React, { Component } from 'react';
import { TextInput, View, Text, AsyncStorage, TouchableOpacity, CameraRoll, StyleSheet, ImagePickerIOS } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { CameraRollPicker } from './CameraRollPicker';

import { addPlaceToFavorite } from '../../services/apiActions';

const toDataUrl = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// const toDataURL = url => fetch(url)
//     .then(response => response.blob())
//     .then(blob => new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.onloadend = () => resolve(reader.result)
//       reader.onerror = reject
//       reader.readAsDataURL(blob)
//     }))

// Make a Component
export class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      favorite: false,
      showPhoto: false,
      image: null,
      photo: {},
    };
    this.savePlace = this.savePlace.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.togglePhoto = this.togglePhoto.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  savePlace(place) {
    const parsedPlace = {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      google_id: place.id,
      google_place_id: place.place_id,
      favorite: this.state.favorite,
      city: place.address_components[3].long_name,
      country: place.address_components[6].long_name,
    };
    this.saveChosenPlaceAsFavorite(parsedPlace, this.props.group);
  }

  handleTextChange(text) {
    this.setState({ text });
  }

  pickImage() {
    ImagePickerIOS.openSelectDialog({}, (response) => {
      toDataUrl(response, (base64) => {
        const photo = {
          uri:  base64,
        };
        this.setState({ photo: photo })
      });
      this.setState({ image: response });
    },
    error => {
      console.error(error);
    })
  }

  togglePhoto() {
    this.setState({
      showPhoto: !this.state.showPhoto
    });
  }

  toggleFavorite() {
    this.setState({
      favorite: !this.state.favorite
    });
  }

  saveChosenPlaceAsFavorite(place, group) {
    const { favorite, text, photo } = this.state;
    AsyncStorage.getItem('user', (err, user) => {
      if (err) {
        return err;
      }
      addPlaceToFavorite({ place: place, user: JSON.parse(user), comment: text, favorite: favorite, group: group, image: photo })
        .then((res) => {
          place.group ? Actions.groupProfile({group: group}) : Actions.home();
        })
        .catch((error) => console.log('Failed Saving Place: ', error));
    });
  }

  render() {
    const { place } = this.props
    const { showPhoto, image } = this.state;
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
        <TouchableOpacity onPress={this.togglePhoto} style={styles.addPhotoContainer}>
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

         { showPhoto && <CameraRollPicker pickImage={this.pickImage} image={image}/>}

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
  }
};
