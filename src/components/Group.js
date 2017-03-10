import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export class Group extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.createGroupScreen = this.createGroupScreen.bind(this);
  }

  componentWillMount() {

  }

  createGroupScreen() {
    Actions.createGroup();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.createGroupScreen} style={styles.createGroup}>
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
