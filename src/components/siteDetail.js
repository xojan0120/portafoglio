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
import SiteScreenshot from './siteScreenshot';
import SiteReaction   from './siteReaction';
import SiteInfo       from './siteInfo';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
    //site id {this.props.match.params.siteId}
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <Grid container className={c.containerGrid}>
        <Grid item xs={12} sm={12} md={8} className={c.screenshotGrid} >
          <SiteScreenshot />
        </Grid>
        <Grid item xs={12} sm={12} md={4} >
          <SiteInfo siteId={this.props.match.params.siteId} />
        </Grid>
        {/*
        <Grid item xs={12} sm={12} md={8} className={c.siteReactionGrid} >
          <SiteReaction />
        </Grid>
        */}
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
