import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

import { getUserPlaces, getPlace } from '../../services/apiActions';
import { Map } from '../map/Map';
import { PlaceList } from './PlaceList';


export class MyPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      favorites: [],
      favoritesList: [],
      selectedFilter: 'all',
      user: null,
      placeCount: 0,
      favoriteCount: 0,
    };
    this.userPlaces = this.userPlaces.bind(this);

    AsyncStorage.getItem('user', (err, user) => {
      if (err) {
        console.log(' NO user: ', err);
        return;
      };
      this.userPlaces(user);
      this.setState({user: user});
    })
  }

  componentWillMount() {
    const place = {
      id: 4
    }
    getPlace(place)
      .then((data) => console.log("YAY", data))
      .catch((err) => console.log("err", err))
  }

  selectedFilterChange(val) {
    this.setState({
      selectedFilter: val,
    });
  }

  userPlaces(user) {
    getUserPlaces(user)
      .then(data => {
        let list = data.favorites.map(favorite => {
          return {
            place: {
              name: favorite.name
            },
            user: this.state.person
          };
        });
        this.setState({
          markers: data.places,
          favorites: data.favorites,
          favoritesList: list,
          favoriteCount: data.favorites.length,
          placeCount: data.places.length
        });
        console.log("FAVORITES", data.favorites);
        console.log("MARKER", data.places)
      })
      .catch((err) => console.log('fuck balls: ', err));
  }

  render() {
    const { favorites, favoritesList, markers, selectedFilter, placeCount, favoriteCount } = this.state;

    return (
      <View style={styles.container}>
        <Map markers={markers} styles={styles.mapContainer} />
        <View style={styles.publicPrivateContainer}>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('all')}>
            <Text style={this.state.selectedFilter === 'all' ? styles.selectedFilter : styles.filters}>ALL {`(${placeCount})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('top')}>
            <Text style={this.state.selectedFilter === 'top' ? styles.selectedFilter : styles.filters}>FAVORITES {`(${favoriteCount})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => this.selectedFilterChange('filter')}>
            <Text style={this.state.selectedFilter === 'filter' ? styles.selectedFilterButton : styles.filterButtonText}>FILTER</Text>
          </TouchableOpacity>
        </View>




        <TouchableOpacity style={styles.addPlaceButton}>
          <Icon
            raised
            name='add'
            color='#FFF'
            containerStyle={{ backgroundColor: '#4296CC' }}
            onPress={this.navigateToAddPlace}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 3
  },
  privatePress: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPlaceButton: {
    position: 'absolute',
    bottom: 10,
    right: 12
  },
  publicPrivateContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 45,
    borderBottomWidth: 0.4,
    borderBottomColor: '#8D8F90',
  },
  filters: {
    marginRight: 10,
    marginLeft: 25,
    alignSelf: 'center',
    color: '#8D8F90',
  },
  selectedFilter: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    marginRight: 10,
    marginLeft: 25,
  },
  selectedFilterButton: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    marginRight: 10,
    marginLeft: 25,
  },
  filterButton: {
    alignSelf: 'center',
    position: 'absolute',
    right: 15,
    top: 12
  },
  filterButtonText: {
    color: '#8D8F90',
  }
});
