import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderWidth: 1,
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle]}>
      <Button onPress={() => { drawer.close(); Actions.googleMap(); }}>Google Map</Button>
      <Button onPress={() => { drawer.close(); Actions.googlePlaces(); }}>Google Places</Button>
      <Button onPress={() => { drawer.close(); Actions.testScreen(); }}>Test Screen</Button>
      <Button onPress={() => { drawer.close(); Actions.login(); }}>Login</Button>
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

module.exports = TabView;
