// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react'

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
import classNames    from 'classnames';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import { Dropzone } from '../lib/common';
import SiteReaction from './siteReaction';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteScreenshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screenshot: false };
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  upload = (data) => {
    // do upload...
    
    console.log(data);
    this.setState({ screenshot: true });
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <Card className={screenshotCardClass(c, this.state.screenshot)} >
        { 
          this.state.screenshot ?
            <Screenshot c={c} callBack={data => this.upload(data)} />
            :
            <Dropzone component={() => <NoImage c={c} />} callBack={data => this.upload(data)} />
        }
      </Card>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
    screenshotCard: {
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
      [theme.breakpoints.up('md')]: {
        height: 750,
      },
    },

    pointer: {
      cursor: 'pointer',
    },

    screenshot: {
      height: 'auto',
      width:  '100%',
    },

    screenshotActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    noImage: {
      textAlign: 'center',
    },

    noImageIcon: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '5rem',
      },

      [theme.breakpoints.up('md')]: {
        fontSize: '20rem',
      },
    },

    noImageComment: {
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
    },
  });
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
const Screenshot = ({c, imageURL, callBack}) => {
  return (
    <React.Fragment>
      <div>
        <img className={c.screenshot} src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
      </div>

      <CardActions className={c.screenshotActions}>
        <div>
          <SiteReaction />
        </div>
        <div>
          <Button size="small" color="primary">
            <Dropzone caption="Change" callBack={callBack} />
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </div>
      </CardActions>
    </React.Fragment>
  );
}

const NoImage = ({c}) => {
  return (
    <div className={c.noImage}>
      <AddPhotoAlternate className={c.noImageIcon} />
      <Typography className={c.noImageComment}>
        Click here to upload a screenshot.
      </Typography>
    </div>
  );
}

// --------------------------------------------------------------------------------------
// Return css class names functions
// --------------------------------------------------------------------------------------
const screenshotCardClass = (c, screenshot) => {
  return screenshot ? c.screenshotCard : classNames(c.screenshotCard, c.pointer)
}
