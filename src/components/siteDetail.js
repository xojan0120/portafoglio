// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Grid from '@material-ui/core/Grid';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import SiteScreenshot from './siteScreenshot';
import SiteReaction from './siteReaction';
import SiteInfo from './siteInfo';

class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
    //site id {this.props.match.params.siteId}
  }

  render() {
    return (
      <Grid container spacing={24} style={{margin: 10}}>
        <Grid item xs={8}>
          <SiteScreenshot />
        </Grid>
        <Grid item xs={4}>
          <SiteInfo />
        </Grid>
        <Grid item xs={8}>
          <SiteReaction />
        </Grid>
      </Grid>
    );
  }
}

export default SiteDetail;
