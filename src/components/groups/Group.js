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

import { GroupList } from './GroupList';
import { GroupSearch } from './GroupSearch'
import { getMyGroups, getPublicGroups, getPrivateGroups } from '../../services/apiActions';


export class Group extends Component {

  constructor(props) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      groups: ds.cloneWithRows([]),
      selectedFilter: 'myGroups',
    };

    this.createGroupScreen = this.createGroupScreen.bind(this);
  }

  componentDidMount() {
    this.getUserGroups();
  }

  getUserGroups() {
    getMyGroups()
      .then((data) => {
        const groups = data.map((group) => {
          group.group.myGroup = true;
          group.group.memberCount = group.users.length
          return group.group
        });
        this.setState({groups: this.state.groups.cloneWithRows(groups)})
      })
      .catch((err) => console.warn("FUCK BALLS", err))
  }

  getAllPublicGroups() {
    getPublicGroups()
    .then((data) => {
      const groups = data.map((group) => {
        group.group.publicGroup = true;
        group.group.memberCount = group.users.length
        return group.group
      });
      this.setState({groups: this.state.groups.cloneWithRows(groups)})
    })
    .catch((err) => console.warn("FUCK BALLS", err))
  }

  getAllPrivateGroups() {
    getPrivateGroups()
    .then((data) => {
      const groups = data.map((group) => {
        group.group.privateGroup = true;
        group.group.memberCount = group.users.length
        return group.group
      });
      this.setState({groups: this.state.groups.cloneWithRows(groups)})
    })
    .catch((err) => console.warn("FUCK BALLS", err))
  }

  createGroupScreen() {
    Actions.createGroup();
  }

  selectedFilterChange(val) {
    this.setState({ selectedFilter: val });
    this.handleFilter(val)
  }

  handleFilter(val) {
    switch (val) {
      case "myGroups":
        this.getUserGroups();
        break
      case "public":
        this.getAllPublicGroups();
        break
      case "private":
        this.getAllPrivateGroups();
        break
    }
  }

  render() {
    const { groups, searching } = this.state;
    return (
      <View style={styles.container}>

        <View style={styles.publicPrivateContainer}>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('myGroups')}>
            <Text style={this.state.selectedFilter == 'myGroups' ? styles.selectedFilter : styles.filters}>YOUR GROUPS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('public')}>
            <Text style={this.state.selectedFilter == 'public' ? styles.selectedFilter : styles.filters}>PUBLIC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('private')}>
            <Text style={this.state.selectedFilter == 'private' ? styles.selectedFilter : styles.filters}>PRIVATE</Text>
          </TouchableOpacity>
        </View>

        <GroupList groups={groups} />

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
    marginTop: 65,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  createGroup: {
    height: 40,
    width: 270,
    alignSelf: 'center',
    backgroundColor: '#4296CC',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  publicPrivateContainer: {
    flexDirection: 'row',
    height: 45,
    borderBottomWidth: 0.4,
    borderBottomColor: '#8D8F90',
    justifyContent: 'center'
  },
  filters: {
    marginRight: 25,
    marginLeft: 25,
    alignSelf: 'center',
    color: '#8D8F90',
    paddingTop: 12
  },
  selectedFilter: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    paddingTop: 12,
    marginRight: 25,
    marginLeft: 25,
  },
});
