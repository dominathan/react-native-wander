import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { OnboardingTile } from './OnboardingTile';
import { Actions } from 'react-native-router-flux';

export class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            slides: [
                {
                    image: require('./tiles/discover.png'),
                    text: 'Tired of always asking friends for advice on where to go? Simply scroll through the feed to see the recommendations and favorite places of people you know and trust.'
                },
                {
                    image: require('./tiles/explore.png'),
                    text: 'Tired of outdated rankings? Find just the best that the world has to offer from the favorites of your friends and of the public.'
                },
                {
                    image: require('./tiles/master.png'),
                    text: 'Curious what the world’s veteran travelers recommend? Find the best cities, bars, restaurants and more from experts who have travelled the globe.'
                }
            ]
        };
    }

    getActiveSlide() {
        let activeSlide = this.state.slides.filter((slide, idx) => {
          if (idx === this.state.activeSlide) {
            return slide;
          }
        });
        return activeSlide[0];
    }

    advanceSlide() {
        if ((this.state.activeSlide + 1) === this.state.slides.length) {
          this.setState({activeSlide: 0});
          Actions.help({ type: 'reset' });
        } else {
          let newActiveSlide = ++this.state.activeSlide;
          this.setState({activeSlide: newActiveSlide});
        }
    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.onboardingContainer}>
                <OnboardingTile
                tile={this.getActiveSlide()}
                />
                <Button
                raised
                backgroundColor='#3c95cd'
                icon={{ name: 'chevron-right', type: 'font-awesome' }}
                title="Next"
                onPress={() => { this.advanceSlide() }}
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
