import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

import { BrowserRouter as Router, Route } from "react-router-dom";
import About from './components/about';

import styles from './css/style'
import MyAppBar from './components/myAppBar';

import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
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
