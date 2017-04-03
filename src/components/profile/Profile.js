import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ListView } from 'react-native';

import { getFriends, getUserFeed, getUserPlaces } from '../../services/apiActions';
import { Feed } from '../Feed';
import { Map } from '../map/Map';
import ProfileStats from './ProfileStats';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      feed: [],
      markers: [],
      favorites: [],
      friends: [],
      favoritesList: [],
      person: this.props.person || null,
      selectedFilter: 'feed'
    };
  }

  componentWillMount() {
    this.userPlaces();
    this.friends();
    this.feed();
  }

  getCountriesVisited() {
    let countries = this.state.markers.reduce((countryTally, marker) => {
      if (countryTally.includes(marker.country)) {
        return countryTally;
      }
      countryTally.push(marker.country);
      return countryTally;
    }, []);
    this.setState({ countries });
  }

  feed() {
    getUserFeed()
      .then(feed => {
        this.setState({ display: feed,
        feed,
        feedType: 'feed' });
      });
  }

  friends() {
    getFriends()
      .then(friends => {
          this.setState({ friends });
      });
  }

  selectedFilterChange(val) {
    this.setState({
      selectedFilter: val,
      feedType: val
    });
  }

  userPlaces() {
    getUserPlaces(this.state.person)
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
          favoritesList: list
        });
        console.log(data.favorites);
      })
      .then(() => {
        this.getCountriesVisited();
      })
      .catch((err) => console.log('fuck balls: ', err));
  }

  render() {
    const { countries, favorites, favoritesList, feed, feedType, friends, markers, person, selectedFilter } = this.state;

    return (
      <View style={styles.container}>
        <Map markers={markers} styles={styles.mapContainer} />
        <View style={styles.detailsContainer}>
          { person && <View style={styles.profileDetailsContainer}>
            <View source={styles.profileImageContainer}>
            <Image source={{ uri: person.photo_url }} style={styles.photo} />
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>{person.first_name} {person.last_name}</Text>
            </View>
          </View> }
          <View style={styles.statsContainer}>
            <ProfileStats label="Friends" icon="group" data={friends.length} />
            <ProfileStats label="Favorites" icon="star-o" data={favorites.length} />
            <ProfileStats label="Countries" icon="globe" data={countries.length} />
          </View>
          <View style={styles.listContainer}>
            <View style={styles.filtersContainer}>
              <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('feed')}>
                <Text style={selectedFilter === 'feed' ? styles.selectedFilter : styles.filters}>FEED</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('favoritesList')}>
                <Text style={selectedFilter === 'favoritesList' ? styles.selectedFilter : styles.filters}>FAVORITES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  detailsContainer: {
    flex: 1,
    position: 'relative'
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 45,
    borderBottomWidth: 0.4,
    borderBottomColor: '#8D8F90'
  },
  filters: {
    marginRight: 10,
    marginLeft: 15,
    alignSelf: 'center',
    color: '#8D8F90'
  },
  selectedFilter: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 15
  },
  selectedFilterButton: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    marginRight: 10,
    marginLeft: 25
  },
  filterButton: {
    alignSelf: 'center',
    position: 'absolute',
    right: 15,
    top: 12
  },
  filterButtonText: {
    color: '#8D8F90',
  },
  listContainer: {
    flex: 3
  },
  mapContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginLeft: 80,
    alignSelf: 'flex-start',
    paddingTop: 15
  },
  privatePress: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f4f4f4'
  },
  profileImageContainer: {
    flex: 1
  },
  profileTextContainer: {
    flex: 3,
    marginLeft: 10
  },
  photo: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -15,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 0
  }
});
