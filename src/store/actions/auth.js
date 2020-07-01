import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token ) => {
  return dispatch => {
    let isSignedIn = true;
    dispatch({ type: AUTHENTICATE, userId: userId, token: token, isSignedIn: isSignedIn });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDX3tTrFOsxk-RagxWLOXHgCMq-450lG9I',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

 
    const resData = await response.json();
    console.log(resData);
    saveUserCredentials(email, password);
    saveDataToStorage(resData.idToken, resData.localId);
    dispatch(authenticate(resData.localId, resData.idToken));
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDX3tTrFOsxk-RagxWLOXHgCMq-450lG9I',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    saveDataToStorage(resData.idToken, resData.localId);
    dispatch(authenticate(resData.localId, resData.idToken));
  };
};

const saveUserCredentials = (username, password) => {
  AsyncStorage.setItem(
    'userCredentials',
    JSON.stringify({
      usernameData: username,
      userPasswordData: password
    })
  );
};


const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
  console.log('item set')
};