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

          <MenuListForLg c={c} />

          <SignInOut c={c} user={this.props.user} isLoading={this.props.isLoading} />
          <MenuIconForSm c={c} anchorEl={this.state.anchorEl} openMenu={this.openMenu} />
        </Toolbar>

        <MenuListForSm user={this.props.user} anchorEl={this.state.anchorEl} closeMenu={this.closeMenu} />
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

    // 幅600px以上の場合に非表示
    hideLg: {
      '@media screen and (min-width:600px)': { display: 'none' }
    },

    // 幅600px未満の場合に非表示
    hideSm: {
      '@media screen and (max-width:599px)': { display: 'none' }
    },

    menuIconForSm: {
      marginLeft: 10,
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

const MenuIconForSm = ({c, anchorEl, openMenu}) => {
  return (
    <MenuIcon
      className={c.hideLg + " " + c.menuIconForSm}
      aria-owns={anchorEl ? 'simple-menu' : undefined}
      aria-haspopup="true"
      onClick={(event)=>openMenu(event)}
    />
  );
}

const MenuListForLg = ({c}) => {
  return (
    <div className={c.hideSm}>
      <Button color="inherit" component={Link} to="/about">About</Button>
      <Button color="inherit" component={Link} to="/sites/new">New</Button>
      <Button color="inherit" component={Link} to="/sites/random">Random</Button>
    </div>
  );
}

const MenuListForSm = ({user, anchorEl, closeMenu}) => {
  return (
    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>closeMenu()} >
      <MenuItem component={Link} to="/about"        onClick={()=>closeMenu()}>About</MenuItem>
      <MenuItem component={Link} to="/sites/new"    onClick={()=>closeMenu()}>New</MenuItem>
      <MenuItem component={Link} to="/sites/random" onClick={()=>closeMenu()}>Random</MenuItem>
      {
        user ?
        <MenuItem component={Link} to="/" onClick={()=>{FirebaseAuth.signOut();closeMenu()}}>Sign out</MenuItem>
          :
        <MenuItem component={Link} to="/signin" onClick={()=>closeMenu()}>Sign in</MenuItem>
      }
    </Menu>
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

      <span className={c.hideSm}>
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
