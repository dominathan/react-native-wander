import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';

export class OnboardingTile extends Component {
    render() {
        return (
            <Tile
              imageSrc={this.props.tile.image}
              title={this.props.tile.title}
              containerStyle={styles.container}
              contentContainerStyle={styles.textContainer}
              imageContainerStyle={styles.imageContainer}
            >
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{this.props.tile.text}</Text>
              </View>
            </Tile>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
      flex: 3,
      width: null,
      height: null,
      resizeMode: 'contain'
    },
    textContainer: {
      flex: 1
    }
});
