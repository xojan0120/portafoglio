// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Grid           from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes     from 'prop-types';
import { Redirect }  from 'react-router-dom';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import SiteScreenshot from './siteScreenshot';
import SiteReaction   from './siteReaction';
import SiteInfo       from './siteInfo';
import * as Api       from '../lib/api';
import * as Cmn       from '../lib/common';
import { LoaderBox }  from '../lib/common';
import NotFound       from './notFound';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMine:     false,
      isChecking: true,
      isNotFound: false,
    };

    if (!this.props.isRegistration) Cmn.judgeSite(this, props.match.params.siteId) 
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    if (this.props.isRegistration) {
      this.setState({ isChecking: false, isNotFound: false });
    } else {
      Api.checkSite(this.props.match.params.siteId)
        .then (res   => this.setState({ isChecking: false, isNotFound: false }))
        .catch(error => this.setState({ isChecking: false, isNotFound: true  }));
    }
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      this.state.isChecking ?
        <LoaderBox />
        :
        this.state.isNotFound ?
          <NotFound />
          :
          <Grid container className={c.containerGrid}>
            <Grid item xs={12} sm={12} md={8} className={c.screenshotGrid} >
              <SiteScreenshot
                siteId={this.props.isRegistration ? null : this.props.match.params.siteId} 
                isMine={this.state.isMine} 
                user={this.props.user}
                isRegistration={this.props.isRegistration}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} >
              <SiteInfo 
                siteId={this.props.isRegistration ? null : this.props.match.params.siteId} 
                isMine={this.state.isMine} 
                user={this.props.user}
                isRegistration={this.props.isRegistration}
              />
            </Grid>
          </Grid>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
    containerGrid: {
      padding: 20,
      //width: '90%',
    },

    screenshotGrid: {
      //height: '80vh',
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
        marginBottom: 10,
      },

      [theme.breakpoints.up('md')]: {
        paddingRight: 20,
      },

      flexBasis: '100%',
    },
    
    siteReactionGrid: {
      marginTop: 10,
      //height: '80vh',
      //paddingTop: 10,
    },
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
SiteDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(SiteDetail);
