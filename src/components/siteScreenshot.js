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
import Snackbar          from '@material-ui/core/Snackbar';

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
import * as Api     from '../lib/api';
import * as Cmn     from '../lib/common';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteScreenshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot:   false,
      //authSiteOwner:    false,
      snackOpen:    false,
      snackMessage: '',
      //user:         null,
    };

    if (this.props.mode !== 'register') {
      Api.getSiteScreenshot(this.props.siteId)
        .then (res   => { if (res.status === 200) this.setState({ screenshot: res.data.url }) })
        .catch(error => console.log(error));
    }

    console.log(this.props.user);
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleUpload = (data) => {
    if (this.props.user) {
      if (this.props.mode === 'register') {
        this.setState({ screenshot: data });
      } else {
        this.props.user.getIdToken(true)
          .then (token => this.uploadSiteScreenshot(data, token, this.props.user.uid))
          .catch(error => console.log(error));
      }
    }
  }

  handleDelete = () => {
    console.log("run handleDelete!");
    if (this.props.user) {
      if (this.props.mode === 'register') {
        this.setState({ screenshot: false });
      } else {
        this.props.user.getIdToken(true)
          .then (token => this.deleteSiteScreenshot(this.props.siteId, token, this.props.user.uid))
          .catch(error => console.log(error));
      }
    }
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  uploadSiteScreenshot = (data, token, uid) => {
    if (this.props.mode === 'register') {
      this.setState({ screenshot: data });
    } else {
      Api.uploadSiteScreenshot(data, token, uid)
        .then(res => {
          console.log(data);
          if (res.status === 200) {
            //this.setState({ screenshot: true });
            this.setState({ screenshot: data });
          }
        })
        .catch(error => console.log(error));
    }
  }

  deleteSiteScreenshot = (siteId, token, uid) => {
    Api.deleteSiteScreenshot(siteId, token, uid)
      .then(res => {
        if (res.status === 200) {
          this.setState({ screenshot: false });
        }
      })
      .catch(error => console.log(error));
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
            <Screenshot 
              c={c}
              dataUrl={this.state.screenshot}
              onUpload={data => this.handleUpload(data)}
              onDelete={() => this.handleDelete()}
              siteId={this.props.siteId}
              user={this.props.user}
              mode={this.props.mode}
            />
            :
            <Dropzone 
              component={() => <NoImage c={c} />} 
              callBack={data => this.uploadSiteScreenshot(data)}
            />
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
      height: 690,
      width:  '100%',
      objectFit: 'contain',
    },

    screenshotActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    noImage: {
      [theme.breakpoints.up('md')]: {
        paddingTop: 100,
      },
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
const Screenshot = ({c, dataUrl, onUpload, onDelete, siteId, user, mode}) => {
  return (
    <React.Fragment>
      <div>
        {/* <img className={c.screenshot} src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" /> */}
        <img className={c.screenshot} src={dataUrl} id="screenshot"/>
      </div>

      <CardActions className={c.screenshotActions}>
        <div>
          { mode === 'register' ? null : <SiteReaction siteId={siteId} user={user} /> }
        </div>
        <div>
          <Button size="small" color="primary">
            <Dropzone caption="Change" callBack={onUpload} />
          </Button>
          <Button size="small" color="primary" onClick={onDelete}>
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
//      <div>
//        <span style={{verticalAlign:"middle",display:"table-cell",height:500}}>hoge</span>
//      </div>

// --------------------------------------------------------------------------------------
// Return css class names functions
// --------------------------------------------------------------------------------------
const screenshotCardClass = (c, screenshot) => {
  return screenshot ? c.screenshotCard : classNames(c.screenshotCard, c.pointer)
}
