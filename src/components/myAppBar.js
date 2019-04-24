import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const MyAppBar = (props) => {
  const c = props.classes;
  return (
    <AppBar position="static">
      <Toolbar className={c.toolbar}>

        <Typography variant="h4" gutterBottom={true}>
          <Link to="/" className={c.rootLink}>Portafoglio</Link>
        </Typography>

        <MenuIcon
          className={c.menuIcon}
          aria-owns={props.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={(event)=>props.handler.openMenu(event)}
        />

        <Button className={c.menuItem} color="inherit" component={Link} to="/about">About</Button>
        <Button className={c.menuItem} color="inherit" component={Link} to="/new">New</Button>
        <Button className={c.menuItem} color="inherit" component={Link} to="/random">Random</Button>

        {/*
        <Button className={c.login} color="inherit" component={Link} to="/signin" >
          <AccountCircle />Sign in
        </Button>
        */}

        {/*
        <Button className={c.login} color="inherit" onClick={()=>firebase.login()} >
          <AccountCircle />Sign in
        </Button>
        */}
      </Toolbar>

      <div>
        <Menu
          id="simple-menu"
          anchorEl={props.anchorEl}
          open={Boolean(props.anchorEl)}
          onClose={()=>props.handler.closeMenu()}
        >
          <MenuItem component={Link} to="/about"  onClick={()=>props.handler.closeMenu()}>About</MenuItem>
          <MenuItem component={Link} to="/new"    onClick={()=>props.handler.closeMenu()}>New</MenuItem>
          <MenuItem component={Link} to="/random" onClick={()=>props.handler.closeMenu()}>Random</MenuItem>
        </Menu>
      </div>

    </AppBar>
  );
};

export default MyAppBar;
