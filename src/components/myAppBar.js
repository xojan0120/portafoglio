// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import AccountCircle  from '@material-ui/icons/AccountCircle';
import AppBar         from '@material-ui/core/AppBar';
import Button         from '@material-ui/core/Button';
import Menu           from '@material-ui/core/Menu';
import MenuIcon       from '@material-ui/icons/Menu';
import MenuItem       from '@material-ui/core/MenuItem';
import Toolbar        from '@material-ui/core/Toolbar';
import Typography     from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar         from '@material-ui/core/Avatar';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes                from 'prop-types';
import { Link }                 from 'react-router-dom';
import { FaGithub as NoAvatar } from 'react-icons/fa';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from './firebase/firebaseAuth';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class MyAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl:  null,
      //user:      null,
      //isLoading: true,
    };

    //FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
    //  this.setState({
    //    //user:      user,
    //    isLoading: false,
    //  });
    //});
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  openMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <AppBar position="static">
        <Toolbar className={c.toolbar}>
          <SiteTitle c={c} />

          <SignInOut c={c} user={this.props.user} isLoading={this.props.isLoading} />
        </Toolbar>

      </AppBar>
    );
  }
};

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
    avatarIcon: {
      fontSize: 40,
    },

    avatar: {
      display: 'inline-table',
    },

    siteTitle: {
      marginTop: 10,
    },

    siteTitleLink: {
      marginRight:    20,
      color:          'white',
      '&:hover': {
        textDecoration: 'none',
      },
      '&:visited': {
        color:          'white',
      },
    },

    login: {
      marginLeft: 'auto',
    },

    toolbar: {
      //paddingTop: 10,
    },
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(MyAppBar);


// --------------------------------------------------------------------------------------
// Return component functions
// --------------------------------------------------------------------------------------
const SiteTitle = ({c}) => {
  return (
    <Typography variant="h4" gutterBottom={true} className={c.siteTitle}>
      <Link to="/" className={c.siteTitleLink}>Portafoglio</Link>
    </Typography>
  );
}

const SignInOut = ({c, user, isLoading}) => {
  return (
    <div className={c.login} style={{visibility: isLoading ? "hidden" : "visible"}}>
      {
        user ?
          user.photoURL ?
            <Avatar
              alt={user.displayName}
              src={user.photoURL}
              className={c.avatar}
              component={Link} to={'/users/' + user.uid + '/detail'}
            />
            :
            <NoAvatar 
              className={c.avatarIcon}
              component={Link} to={'/users/' + user.uid + '/detail'}
            />
          :
          <AccountCircle className={c.avatarIcon} />
      }

      <span>
      { 
        user ?
          <Button color="inherit" component={Link} to="/" onClick={()=>FirebaseAuth.signOut()} >Sign out</Button>
          :
          <Button color="inherit" component={Link} to="/signin">Sign in</Button>
      }
      </span>
    </div>
  );
}
