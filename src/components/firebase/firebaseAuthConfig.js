import firebase from 'firebase/app';

// ------------------------------------------------------------------------------------------------
// successCallback example
// ------------------------------------------------------------------------------------------------
// const successCallback = (authResult, redirectUrl) => {
//   console.log('sign in success!');
//   console.log(authResult.user);
//   return false; // true is redirect, false is not redirect. default is true.
// }
// ------------------------------------------------------------------------------------------------
// failureCallback example 
// ------------------------------------------------------------------------------------------------
// const failureCallback = (error) => {
//   console.log(`sign in failed!: ${error.message}`);
// }
export default (successCallback, failureCallback) => {
  const config = {
    callbacks: {
      signInSuccessWithAuthResult: successCallback,
      signInFailure:               failureCallback,
      //uiShown: () => document.getElementById('loader').style.display = 'none',
    },
    signInFlow: 'redirect',
    //signInSuccessUrl: '/', // redirectはsinIn.jsの中で記述
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  }
  return config;
}

export const containerId = 'firebaseui-auth-container';
