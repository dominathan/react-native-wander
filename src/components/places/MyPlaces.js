import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { getUserPlaces, getPlace } from '../../services/apiActions';
import { Map } from '../map/Map';
import { PlaceList } from './PlaceList';


export class MyPlaces extends Component {
  constructor(props) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      places: ds.cloneWithRows([]),
      markers: [],
      markersFavorites: [],
      favorites: ds.cloneWithRows([]),
      favoritesList: [],
      selectedFilter: 'all',
      user: null,
      placeCount: 0,
      favoriteCount: 0,
      placeFeedReady: false,
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

  componentDidMount() {

  }

  navigateToAddPlace() {
    Actions.googlePlaces();
  }

  selectedFilterChange(val) {
    this.setState({
      selectedFilter: val,
    });
  }

  favoritePlaceFilter(favorites,places) {
    const favoriteIds = favorites.map(fav => fav.place_id)
    return places.filter((place) => favoriteIds.includes(place.id))
  }

  userPlaces(user) {
    getUserPlaces(user)
      .then(data => {
        const actualFavorites = this.favoritePlaceFilter(data.favorites,data.places);
        this.setState({
          markers: data.places,
          markersFavorites: data.favorites,
          favorites: this.state.favorites.cloneWithRows(actualFavorites),
          favoriteCount: data.favorites.length,
          placeCount: data.places.length,
          places: this.state.places.cloneWithRows(data.places),
          placeFeedReady: true
        });
        console.log("FAVORITES", data.favorites)
        console.log("PLACE", data.places)
      })
      .catch((err) => console.log('fuck balls: ', err));
  }

  render() {
    const { places, favorites, markers, markersFavorites, selectedFilter, placeCount, favoriteCount, placeFeedReady } = this.state;

    return (
      <View style={styles.container}>
        {selectedFilter === 'all' ? <Map markers={markers} styles={styles.mapContainer} /> : <Map markers={markersFavorites} styles={styles.mapContainer} />}
        <View style={styles.publicPrivateContainer}>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('all')}>
            <Text style={this.state.selectedFilter === 'all' ? styles.selectedFilter : styles.filters}>ALL {`(${placeCount})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('favorites')}>
            <Text style={this.state.selectedFilter === 'favorites' ? styles.selectedFilter : styles.filters}>FAVORITES {`(${favoriteCount})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => this.selectedFilterChange('filter')}>
            <Text style={this.state.selectedFilter === 'filter' ? styles.selectedFilterButton : styles.filterButtonText}>FILTER</Text>
          </TouchableOpacity>
        </View>


        {placeFeedReady && selectedFilter === "all" && <PlaceList places={places} /> }
        {placeFeedReady && selectedFilter === "favorites" && <PlaceList places={favorites} /> }

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
