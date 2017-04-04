import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { OnboardingTile } from './OnboardingTile';

export class Onboarding extends Component {

    constructor(props) {
        super(props);
        state: {
            activeSlide: 1
        }
    }

    setActiveSlide() {
        
    }

    render() {
        <View style={styles.container}>
            <View style={styles.onboardingContainer}>
                <OnboardingTile 
                isActive={} 
                image={} 
                text={} />
            </View>
            <View style={styles.onboardingContainer}>
                <OnboardingTile 
                isActive={} 
                image={} 
                text={} />
            </View>
            <View style={styles.onboardingContainer}>
                <OnboardingTile 
                isActive={} 
                image={} 
                text={} />
            </View>
        </View>
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
