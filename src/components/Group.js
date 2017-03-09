import React, { Component } from 'react';
import { ListView, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import Button from './Button';

export class Group extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.addGroupScreen = this.addGroupScreen.bind(this);
  }

  componentWillMount() {
    
  }

  addGroupScreen() {
    return
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.addGroupScreen} style={styles.createGroup}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 65,
    justifyContent: 'center'
  },
  createGroup: {
    height: 40,
    width: 270,
    alignSelf: 'flex-end',
    backgroundColor: '#4296CC',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 50
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
});
