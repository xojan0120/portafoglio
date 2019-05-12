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

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api       from '../lib/api';
import * as Cmn       from '../lib/common';
import NotFound       from './notFound';
import SiteInfo       from './siteInfo';
import SiteScreenshot from './siteScreenshot';
import { LoaderBox }  from '../lib/common';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from '../components/firebase/firebaseAuth';

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
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    if (!this.props.isRegistration) {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        if (user) Cmn.judgeSite(this, this.props.match.params.siteId, user.uid);
      });
    }

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
                isRegistration={this.props.isRegistration}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} >
              <SiteInfo 
                siteId={this.props.isRegistration ? null : this.props.match.params.siteId} 
                isMine={this.state.isMine} 
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
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
        marginBottom: 10,
      },

      paddingRight: 20,

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
