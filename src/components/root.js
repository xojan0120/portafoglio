import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import { BrowserRouter as Router, Route } from "react-router-dom";
import About from './about';

import styles from '../style'
import MyAppBar from './myAppBar';

import firebase from 'firebase';
//import firebaseui from 'firebaseui';
//import * as firebaseUtil from '../lib/firebase';
import Button from '@material-ui/core/Button';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

  }

  logintest = () => {
    const config = {
      apiKey: "AIzaSyCbJNWGnTuycjEBMU-pZ8KCNFesNzunolw",
      authDomain: "portafoglio-51885.firebaseapp.com",
      databaseURL: "https://portafoglio-51885.firebaseio.com",
      projectId: "portafoglio-51885",
      storageBucket: "portafoglio-51885.appspot.com",
      messagingSenderId: "853805644356"
    };
    firebase.initializeApp(config);
    //console.log(firebaseApp);
    //const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    console.log(ui);
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  componentDidMount = () => {
    console.log('run componentDidMount!');
  }

  openMenu = (event) => {
    console.log("run openMenu!");
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    console.log("run render!");
    const classes = this.props.classes;
    const anchorEl = this.state.anchorEl;
    const handler = {
      openMenu:  this.openMenu,
      closeMenu: this.closeMenu,
    };
    return (
      <Router>
        <MyAppBar classes={classes} anchorEl={anchorEl} handler={handler} />
        <Route path="/about" render={() => <About param="hoge" />} />
        {/*<Button onClick={()=> firebaseUtil.login()}>test</Button>*/}
        <Button onClick={()=> this.logintest()}>test</Button>
      </Router>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const withStyleComponent = withStyles(styles)(Index);    // CSS in JS適用
const withRootComponent  = withRoot(withStyleComponent); // MuiTheme適用
export default withRootComponent;
