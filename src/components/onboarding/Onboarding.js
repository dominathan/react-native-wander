import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { OnboardingTile } from './OnboardingTile';

export class Onboarding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slides: [
                {
                    image: './tiles/discover.png',
                    text: 'Tired of always asking friends for advice on where to go? Simply scroll through the feed to see the recommendations and favorite places of people you know and trust.'
                },
                {
                    image: './tiles/explore.png',
                    text: 'Tired of outdated rankings? Find just the best that the world has to offer from the favorites of your friends and of the public.'
                },
                {
                    image: './tiles/master.png',
                    text: 'Curious what the world’s veteran travelers recommend? Find the best cities, bars, restaurants and more from experts who have travelled the globe.'
                }
            ],
            activeSlide: 0
        };
    }

    activeSlide() {
        return this.state.slides[this.state.activeSlide];
    }

    advanceSlide() {
        this.setState({ activeSlide: ++this.state.activeSlide });
    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.onboardingContainer}>
                <OnboardingTile 
                tile={this.activeSlide()} 
                />
                <Button 
                raised
                backgroundColor='#3c95cd'
                icon={{ name: 'chevron-right', type: 'font-awesome' }}
                title="Next" 
                onPress={this.advanceSlide()} 
                />
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    onboardingContainer: {
        flex: 1
    }
});
