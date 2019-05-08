// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api from '../lib/api';
import * as Cmn from '../lib/common';
import UserInfo from './userInfo';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from './firebase/firebaseAuth';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: false,
      userInfo: {
        nickname: '',
        userName: '',
        skills:   [],
        snses:    [],
        avatar:   '',
        sites:    [],
      }
    }

    Cmn.authUser(this, this.props.match.params.username);
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      if (user) this.getUserInfo(user.uid);
    });
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getUserInfo = (uid) => {
    Api.getUserInfo(uid)
      .then(res => {
        if (res.status === 200) { 
          this.setState({ userInfo: res.data.userInfo });
        }
      })
      .catch(error => console.log(error));
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    return (
      <div>
        {/*
        user detail {this.props.match.params.username}<br />
        authUser: {this.state.authUser ? "yes" : "no" }
        */}
        <UserInfo username={this.props.match.params.username} />
      </div>
    );
  }
}

export default UserDetail;
