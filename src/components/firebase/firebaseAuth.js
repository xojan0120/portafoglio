// -------------------------------------------------------------------------------------------------
// Firebase documents
// -------------------------------------------------------------------------------------------------
// * Firebase Guide
//   https://firebase.google.com/docs/auth/web/google-signin?hl=ja
// * Manage Users
//   https://firebase.google.com/docs/auth/web/manage-users?hl=ja
// * Firebase Source
//   https://github.com/firebase/firebaseui-web
// * 認証プロバイダ向け
//   https://developers.google.com/identity/protocols/googlescopes?hl=ja

// -------------------------------------------------------------------------------------------------
// * Import Modules
// -------------------------------------------------------------------------------------------------
import firebase   from 'firebase/app';
import firebaseui from 'firebaseui';
import './firebaseui.css';

// -------------------------------------------------------------------------------------------------
// * Import Config
// -------------------------------------------------------------------------------------------------
import authConfig, { containerId } from './firebaseAuthConfig';
import config                      from './firebaseConfig';

// -------------------------------------------------------------------------------------------------
// * Functions
// -------------------------------------------------------------------------------------------------
export const init = () => {
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  };
}

export const getFirebase = () => {
  init();
  return firebase; 
}

// ------------------------------------------------------------------------------------------------
// failureCallback example
// ------------------------------------------------------------------------------------------------
// const failureCallback = (error) => {
//   console.log(`failed!: ${error.message}`);
// }
export const signOut = (successCallback, failureCallback) => {
  firebase.auth().signOut()
    .then(successCallback)
    .catch(failureCallback);
}

// ------------------------------------------------------------------------------------------------
// failureCallback example
// ------------------------------------------------------------------------------------------------
// const failureCallback = (error) => {
//   console.log(`failed!: ${error.message}`);
// }
export const userDelete = (successCallback, failureCallback, noLoggedInCallback) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.delete()
        .then(successCallback)
        .catch(failureCallback);
    } else {
      noLoggedInCallback();
    }
  });
}

// ------------------------------------------------------------------------------------------------
// successCallback, failureCallback sample see firebaseUiConfig.js
// ------------------------------------------------------------------------------------------------
export const uiShow = (successCallback, failureCallback) => {
  init();
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  ui.start(`#${containerId}`, authConfig(successCallback, failureCallback));
}

export const uiHide = () => {
  const ui = firebaseui.auth.AuthUI.getInstance();
  if (ui) ui.reset();
}
