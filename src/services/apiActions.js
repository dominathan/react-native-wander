import { AsyncStorage } from 'react-native';
import { API_BASE } from '../../config/apiBase';
import { Actions } from 'react-native-router-flux';

const headers = (token) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': '',
    'Authorization': `Bearer ${token.idToken}`
  };
};

const handleAuthorization = (resp) => {
  // if (Number(resp.status) >= 400) {
  //   console.log("FAILURE AUTH?")
  //   return Actions.login();
  // }
  // return resp;
}

const defaultPost = (subUrl, data) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
     if (err) {
       console.log(' NO TOKEN: ', err);
       Actions.login();
       return
     }
     const parsedToken = JSON.parse(token);
     fetch(`${API_BASE}/${subUrl}`, {
       method: 'POST',
       headers: headers(parsedToken),
       body: JSON.stringify(data)
     })
     .then((response) => response.json())
    //  .then(handleAuthorization)
     .then((apiData) => resolve(apiData))
     .catch((apiErr) => reject(apiErr));
   });
 });
};

const defaultGet = (subUrl, params) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
     if (err) {
       console.log(' NO TOKEN: ', err);
       Actions.login();
       return
     }
     const parsedToken = JSON.parse(token);
     let url = '';
     if (params) {
       url = `${API_BASE}/${subUrl}?${params}`;
     } else {
       url = `${API_BASE}/${subUrl}`;
     }
     fetch(url, {
       method: 'GET',
       headers: headers(parsedToken)
     })
     .then((response) => response.json())
    //  .then(handleAuthorization)
     .then((apiData) => resolve(apiData))
     .catch((apiErr) => reject(apiErr));
   });
 });
};

const addPlaceToFavorite = (place) => defaultPost('places', place);
const loginUser = (userProfile) => defaultPost('users', userProfile);
const getPlaces = () => defaultGet('places');
const getPlace = (place) => defaultGet(`places/${place.id}`)
const getUserPlaces = (user) => defaultPost('places/user', user);
const getFeed = () => defaultGet('feed');
const getUserFeed = () => defaultGet('feed/users');
const getFriends = () => defaultGet('friends');
const searchForFriends = (query) => defaultGet('users/search', query);
const addFriend = (friend) => defaultPost('friends', friend);
const getFriendFeed = () => defaultGet('feed/friends');
const getExpertFeed = () => defaultGet('feed/experts');
const getRequestedFriends = () => defaultGet('friends/requested');
const acceptFriend = (friend) => defaultPost('friends/accept', friend);
const declineFriend = (friend) => defaultPost('friends/decline', friend);
const getMyGroups = () => defaultGet('groups');
const createGroup = (group) => defaultPost('groups', group);
const getPrivateGroups = () => defaultGet('groups/private');
const getPublicGroups = () => defaultGet('groups/public');
const joinPublicGroup = (group) => defaultPost('groups/public', group);
const joinPrivateGroup = (group) => defaultPost('groups/private', group);
const searchForGroups = (query) => defaultGet('groups/search', query);
const getGroupPlaces =  (query) => defaultGet('groups/places', query);
const addFriendsToGroup = (friendsAndGroup) => defaultPost('groups/friends', friendsAndGroup);

export {
  addPlaceToFavorite,
  loginUser,
  getUserFeed,
  getUserPlaces,
  getPlaces,
  getPlace,
  getFeed,
  getFriends,
  searchForFriends,
  addFriend,
  getFriendFeed,
  getExpertFeed,
  getRequestedFriends,
  acceptFriend,
  declineFriend,
  getMyGroups,
  createGroup,
  getPublicGroups,
  getPrivateGroups,
  joinPublicGroup,
  joinPrivateGroup,
  searchForGroups,
  getGroupPlaces,
  addFriendsToGroup
};
