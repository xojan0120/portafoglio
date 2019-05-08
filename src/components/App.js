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
import UserPage   from './userPage';
import * as Cmn   from '../lib/common';

// -------------------------------------------------------------------------------------------------
// * Import Modules(CSS)
// -------------------------------------------------------------------------------------------------
//import styles from '../css/style'

import firebase from 'firebase';

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
    const { user, isLoading } = this.state;
    return (
      <Router>
        <MyAppBar user={user} isLoading={isLoading} />

        <Switch>
          <Route exact path="/"
            render={()      => <Redirect to="/sites" />} />

          <Route exact path="/sites"
            render={()      => <SiteList />} />

          <PrivateRoute exact path="/sites/register" 
            user={user} isLoading={isLoading} redirectTo="/sites"
            render={()      => <SiteDetail user={user} isRegistration={true} />} />

          <Route exact path="/signin"
            render={()      => <SignIn />} />

          <Route exact path="/sites/:siteId/detail" 
            render={(match) => <SiteDetail {...match} user={user} />} />

          <Route exact path="/users/:uid/detail" 
            render={(match) => <UserPage   {...match} user={user} isLoading={isLoading} />} />

          <Route component={NotFound} />
        </Switch>

      </Router>
    );
  }
}

const PrivateRoute = (props) => {
  const { user, isLoading, redirectTo } = props;
  if (!isLoading) {
    return user ? <Route {...props} /> : <Redirect to={redirectTo} />;
  } else {
    return null; // これがないとローディング中に何もレンダリングされないページが表示されて止まる
  }
}

// --------------------------------------------------------------------------------------
// MuiTheme適用
// --------------------------------------------------------------------------------------
const withRootComponent  = withRoot(App);

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withRootComponent;
