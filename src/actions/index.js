import { EMAIL_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_START } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  // if using redux-thunk in index.ios.js
  // store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    Auth0Lock.stuff.signIn(email, password)
      .then((user) => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      })
      .catch(() => {
        Auth0Lock.createUser(email, password)
          .then(user => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
          })
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
