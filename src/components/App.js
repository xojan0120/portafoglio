// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import { withStyles } from '@material-ui/core/styles';
import withRoot       from '../withRoot';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import { 
  BrowserRouter as Router,
  Route,
  Switch 
}                from 'react-router-dom';
import PropTypes from 'prop-types';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import './firebase/loading.css';
import * as FirebaseAuth from './firebase/firebaseAuth';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import About      from './about';
import MyAppBar   from './myAppBar';
import SiteList   from './siteList';
import SiteDetail from './siteDetail';

// -------------------------------------------------------------------------------------------------
// * Import Modules(CSS)
// -------------------------------------------------------------------------------------------------
import styles from '../css/style'

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  hook = (callback) => {
    FirebaseAuth.uiHide();
    return callback;
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    console.log("run render!");
    return (
      <Router>
        <MyAppBar />

        <Switch>
          <Route exact path="/"       render={() => this.hook(<SiteList order="new" />)} />
          <Route exact path="/about"  render={() => this.hook(<About param="123" />)} />
          <Route exact path="/signin" render={() => FirebaseAuth.uiShow()} />
          <Route exact path="/sites/:siteId/detail" 
                                      render={(match) => this.hook(<SiteDetail {...match}/>)} />
        </Switch>

        <div id="firebaseui-auth-container"></div>
      </Router>
    );
  }
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// HOC
// --------------------------------------------------------------------------------------
const withStyleComponent = withStyles(styles)(App);    // CSS in JS適用
const withRootComponent  = withRoot(withStyleComponent); // MuiTheme適用

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withRootComponent;
