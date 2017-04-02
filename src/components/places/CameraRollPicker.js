import React, { Component } from 'react';
import { View, StyleSheet, Image, ImagePickerIOS } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
// import { addPlaceToFavorite } from '../../services/apiActions';

// Make a Component
export class CameraRollPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  componentDidMount() {
    this.props.pickImage();
  }

  render() {
    const { image } = this.props

    return (
      <View style={styles.container}>
        { image &&
          <Image style={{ flex: 1 }} source={{ uri: image }} />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
