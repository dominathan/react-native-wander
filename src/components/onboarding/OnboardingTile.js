import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export class OnboardingTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive
        };
    }
    render() {
        return (
            <View>
                <View>
                    <Image src={this.props.image} />
                </View>
                <View>
                    <Text>{this.props.text}</Text>
                </View>
            </View>
        );
    }
}
