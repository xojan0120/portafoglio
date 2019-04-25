import React          from 'react';
import { Link }       from 'react-router-dom';

import AccountCircle  from '@material-ui/icons/AccountCircle';
import AppBar         from '@material-ui/core/AppBar';
import Button         from '@material-ui/core/Button';
import Menu           from '@material-ui/core/Menu';
import MenuIcon       from '@material-ui/icons/Menu';
import MenuItem       from '@material-ui/core/MenuItem';
import Toolbar        from '@material-ui/core/Toolbar';
import Typography     from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import styles         from '../css/style'

import * as FirebaseAuth from './firebase/firebaseAuth';
import * as Cmn from '../lib/common';

class MyAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl:  null,
      user:      null,
      isLoading: true,
    };

    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      this.setState({
        user:      user,
        isLoading: false,
      });
    });
  }

  openMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const c = this.props.classes;
    return (
      <AppBar position="static">
        <Toolbar className={c.toolbar}>
          <SiteTitle c={c} />

          <MenuListForLg c={c} />

          <SignInOut c={c} user={this.state.user} isLoading={this.state.isLoading}/>
          <MenuIconForSm c={c} anchorEl={this.state.anchorEl} openMenu={this.openMenu} />
        </Toolbar>

        <MenuListForSm user={this.state.user} anchorEl={this.state.anchorEl} closeMenu={this.closeMenu} />
      </AppBar>
    );
  }
};
export default withStyles(styles)(MyAppBar);

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
      <Button color="inherit" component={Link} to="/new">New</Button>
      <Button color="inherit" component={Link} to="/random">Random</Button>
    </div>
  );
}

const MenuListForSm = ({user, anchorEl, closeMenu}) => {
  return (
    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>closeMenu()} >
      <MenuItem component={Link} to="/about"  onClick={()=>closeMenu()}>About</MenuItem>
      <MenuItem component={Link} to="/new"    onClick={()=>closeMenu()}>New</MenuItem>
      <MenuItem component={Link} to="/random" onClick={()=>closeMenu()}>Random</MenuItem>
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
    <div className={c.login} style={Cmn.hide(isLoading)}>
      {
        user ?
        <Avatar alt={user.displayName} src={user.photoURL} className={c.avatar}  />
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
