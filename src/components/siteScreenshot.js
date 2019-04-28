// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React, {useCallback} from 'react'

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Card              from '@material-ui/core/Card';
import CardMedia         from '@material-ui/core/CardMedia';
import { withStyles }    from '@material-ui/core/styles';
import CardActions       from '@material-ui/core/CardActions';
import Button            from '@material-ui/core/Button';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import Typography        from '@material-ui/core/Typography';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes     from 'prop-types';
import {useDropzone} from 'react-dropzone'

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import styles from '../css/style'
import { Dropzone } from '../lib/common';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteScreenshot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const c = this.props.classes;
    const screenshot = false;
    return (
      <Card className={c.siteScreenshotCard}>
        { 
          screenshot ?
          <Screenshot c={c} />
          :
          <Dropzone component={()=><NoImage c={c} />} callBack={(data)=>console.log(data)} />
        }
      </Card>
    );
  }
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
SiteScreenshot.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(SiteScreenshot);

// --------------------------------------------------------------------------------------
// Return component functions
// --------------------------------------------------------------------------------------
const Screenshot = ({c}) => {
  return (
    <React.Fragment>
      <CardMedia
        className={c.siteScreenshotMedia}
        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
        title="Site Screenshot"
      />
      <CardActions className={c.siteScreenshotActions}>
        <Button size="small" color="primary">
          <Dropzone caption="Change" />
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </React.Fragment>
  );
}

const NoImage = ({c}) => {
  return (
    <div className={c.noImage}>
      <AddPhotoAlternate className={c.noImageIcon} />
      <Typography variant="h3">
        Click here to upload a screenshot.
      </Typography>
    </div>
  );
}
