import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from './about';

import styles from '../css/style'
import MyAppBar from './myAppBar';

import * as FirebaseAuth from './firebase/firebaseAuth';
import './firebase/loading.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  hook = (callback) => {
    FirebaseAuth.uiHide();
    return callback;
  }

  render() {
    console.log("run render!");
    return (
      <Router>
        <MyAppBar />

        <Switch>
          <Route exact path="/"       render={() => this.hook(<div>top</div>)} />
          <Route exact path="/about"  render={() => this.hook(<About param="123" />)} />
          <Route exact path="/signin" render={() => FirebaseAuth.uiShow()} />
        </Switch>

        <div id="firebaseui-auth-container"></div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const withStyleComponent = withStyles(styles)(App);    // CSS in JS適用
const withRootComponent  = withRoot(withStyleComponent); // MuiTheme適用
export default withRootComponent;
