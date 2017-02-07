import { AsyncStorage } from 'react-native';
import { API_BASE } from '../../config/apiBase';

const defaultPost = (subUrl, data) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
     if (err) {
       console.log(' NO TOKEN: ', err);
       return err;
     }
     const parsedToken = JSON.parse(token);
     fetch(`${API_BASE}/${subUrl}`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Origin': '',
         'Authorization': `Bearer ${parsedToken.idToken}`
       },
       body: JSON.stringify(data)
     })
     .then((response) => response.json())
     .then((apiData) => resolve(apiData))
     .catch((apiErr) => reject(apiErr));
   });
 });
};

const addPlaceToFavorite = (place) => defaultPost('places', place);
const loginUser = (userProfile) => defaultPost('users', userProfile);

export { addPlaceToFavorite, loginUser };
