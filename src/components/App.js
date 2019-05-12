// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import withRoot from '../withRoot';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import MyAppBar   from './myAppBar';
import NotFound   from './notFound';
import SignIn     from './signIn';
import SiteDetail from './siteDetail';
import SiteList   from './siteList';
import UserPage   from './userPage';
import '../css/common.scss';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from '../components/firebase/firebaseAuth';

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
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      user ? this.setState({ user: user }) : this.setState({ user: null });
      this.setState({ isLoading: false });
    });
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {

    const { user, isLoading } = this.state;
    return (
      <Router>
        <MyAppBar />

        <Switch>
          <Route exact path="/"
            render={()      => <Redirect to="/sites" />} />

          <Route exact path="/sites"
            render={()      => <SiteList />} />

          <PrivateRoute exact path="/sites/register" 
            user={user} isLoading={isLoading} redirectTo="/sites"
            render={()      => <SiteDetail isRegistration={true} />} />

          <Route exact path="/signin"
            render={()      => <SignIn />} />

          <Route exact path="/sites/:siteId/detail" 
            render={(match) => <SiteDetail {...match} />} />

          <Route exact path="/users/:uid/detail" 
            render={(match) => <UserPage {...match} />} />

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
