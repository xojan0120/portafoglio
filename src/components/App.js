// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
//import { withStyles } from '@material-ui/core/styles';
import withRoot       from '../withRoot';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
}                from 'react-router-dom';
import PropTypes from 'prop-types';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import About      from './about';
import MyAppBar   from './myAppBar';
import SiteList   from './siteList';
import SiteDetail from './siteDetail';
import NotFound   from './notFound';
import SignIn     from './signIn';
import UserDetail from './userDetail';
import * as Cmn   from '../lib/common';

// -------------------------------------------------------------------------------------------------
// * Import Modules(CSS)
// -------------------------------------------------------------------------------------------------
//import styles from '../css/style'

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:      null,
      isLoading: true,
    };
    Cmn.setUser(this);
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    console.log("run render!");
    return (
      <Router>
        <MyAppBar user={this.state.user} isLoading={this.state.isLoading} />

        <Switch>
          <Route exact path="/"
            render={()      => <Redirect to="/sites/new" />} />

          <Route exact path={["/sites/new", "/sites/new/:page"]}
            render={(match) => <SiteList order="new" {...match} />} />

          <Route exact path={["/sites/random", "/sites/random/:page"]}
            render={(match) => <SiteList order="random" {...match} />} />

          <Route exact path="/sites/register"
            render={()      => <SiteDetail user={this.state.user} mode="register" />} />

          <Route exact path="/about"
            render={()      => <About param="123" />} />

          <Route exact path="/signin"
            render={()      => <SignIn />} />

          <Route exact path="/sites/:siteId/detail" 
            render={(match) => <SiteDetail {...match} user={this.state.user} />} />

          <Route exact path="/users/:username/detail" 
            render={(match) => <UserDetail {...match} user={this.state.user} />} />

          <Route component={NotFound} />
        </Switch>

      </Router>
    );
  }
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
//App.propTypes = {
//  classes: PropTypes.object.isRequired,
//};

// --------------------------------------------------------------------------------------
// HOC
// --------------------------------------------------------------------------------------
//const withStyleComponent = withStyles(styles)(App);    // CSS in JS適用
const withRootComponent  = withRoot(App); // MuiTheme適用

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withRootComponent;
