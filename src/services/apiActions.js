import { AsyncStorage } from 'react-native';
import { API_BASE } from '../../config/apiBase';

const headers = (token) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': '',
    'Authorization': `Bearer ${token.idToken}`
  };
};

const defaultPost = (subUrl, data) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
     if (err) {
       console.log(' NO TOKEN: ', err);
       reject(err);
     }
     const parsedToken = JSON.parse(token);
     fetch(`${API_BASE}/${subUrl}`, {
       method: 'POST',
       headers: headers(parsedToken),
       body: JSON.stringify(data)
     })
     .then((response) => response.json())
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
       reject(err);
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
     .then((apiData) => resolve(apiData))
     .catch((apiErr) => reject(apiErr));
   });
 });
};

const addPlaceToFavorite = (place) => defaultPost('places', place);
const loginUser = (userProfile) => defaultPost('users', userProfile);
const getUserPlaces = () => defaultGet('places');
const getFeed = () => defaultGet('feed');
const getFriends = () => defaultGet('friends');
const searchForFriends = (query) => defaultGet('users/search', query);
const addFriend = (friend) => defaultPost('friends', friend);
const getFriendFeed = () => defaultGet('feed/friends');
const getExpertFeed = () => defaultGet('feed/experts');
const getRequestedFriends = () => defaultGet('friends/pending');
const acceptFriend = (friend) => defaultPost('friends/accept', friend);
const getMyGroups = () => defaultGet('groups');
const createGroup = (group) => defaultPost('groups', group);

export {
  addPlaceToFavorite,
  loginUser,
  getUserPlaces,
  getFeed,
  getFriends,
  searchForFriends,
  addFriend,
  getFriendFeed,
  getExpertFeed,
  getRequestedFriends,
  acceptFriend,
  getMyGroups,
  createGroup
};
