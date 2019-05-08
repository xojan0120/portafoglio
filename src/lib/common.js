// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React, {useCallback} from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import { SyncLoader as Loader } from 'react-spinners';
import PropTypes                from 'prop-types';
import {useDropzone}            from 'react-dropzone'

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api from './api';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from '../components/firebase/firebaseAuth';

// ----------------------------------------------------------------------------------------
// * Common Function
// ----------------------------------------------------------------------------------------
//export const hide = (isLoading) => {
//  return isLoading ? {visibility: "hidden"} : {visibility: "visible"}
//}
export const getApiError = (error) => {
  let message = '';
  try {
    message = error.response.data.message || error.response.data.error;
  } catch {
    message = error.message;
  }
  return message;
}

export const setUser = (self) => {
  FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
    user ? self.setState({ user: user }) : self.setState({ user: null });
    self.setState({ isLoading: false });
  });
}

export const judgeSite = (self, siteId) => {
  FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
    if(user) {
      user.getIdToken(true)
        .then (token => {
          Api.judgeSite(siteId, token)
            .then(res => {
              if (res.status === 200 && res.data.result === "true") {
                self.setState({ isMine: true });
              } else {
                self.setState({ isMine: false });
              }
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error) );
    }
  });
}

export const judgeUser = (self, uid) => {
  FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
    if(user) {
      user.getIdToken(true)
        .then (token => {
          Api.judgeUser(uid, token)
            .then(res => {
              if (res.status === 200 && res.data.result === "true") {
                self.setState({ isMe: true });
              } else {
                self.setState({ isMe: false });
              }
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error) );
    }
  });
}

//export const authSiteOwner = (self, siteId) => {
//  FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
//    if(user) {
//      // token取得
//      user.getIdToken(true)
//        .then (token => {
//          // site owner判定
//          Api.authSiteOwner(siteId, token)
//            .then(res => {
//              if (res.status === 200 && res.data.result === "true") {
//                self.setState({ authSiteOwner: true });
//              } else {
//                self.setState({ authSiteOwner: false });
//              }
//            })
//            .catch(error => console.log(error));
//        })
//        .catch(error => console.log(error) );
//      // user保持
//      self.setState({ user: user });
//    } else {
//      self.setState({ user: null });
//    }
//  });
//}

// ----------------------------------------------------------------------------------------
// * Common Component
// ----------------------------------------------------------------------------------------
export const LoaderBox = (props) => {
  return (
    <div style={{marginTop: 30, textAlign: 'center'}}>
      <Loader margin="10px" size={30} color="#36D7B7"/>
    </div>
  );
}

export const Dropzone = ({caption, component, callBack}) => {
  const Component = component;

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload  = () => callBack(reader.result);
  }, [])
  const {getRootProps, getInputProps, open/*, isDragActive*/} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={{height:"100%"}}>
      <input {...getInputProps()} />
      { caption   ? caption                     : null }
      { component ? <Component onClick={open}/> : null }
    </div>
  )
}
Dropzone.propTypes = {
  component: PropTypes.func,
  caption:   PropTypes.string,
  callBack:  PropTypes.func,
};
