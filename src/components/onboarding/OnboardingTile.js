import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export class OnboardingTile extends Component {
    render() {
        console.log('tile', this);
        return (
            <View>
                <View>
                    <Image source={this.props.tile.image} />
                </View>
                <View>
                    <Text>{this.props.tile.text}</Text>
                </View>
            </View>
        );
    }
}
