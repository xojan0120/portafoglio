// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react'

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import Button            from '@material-ui/core/Button';
import Card              from '@material-ui/core/Card';
import CardActions       from '@material-ui/core/CardActions';
import Snackbar          from '@material-ui/core/Snackbar';
import Typography        from '@material-ui/core/Typography';
import { withStyles }    from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes     from 'prop-types';
import classNames    from 'classnames';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api     from '../lib/api';
import * as Cmn     from '../lib/common';
import SiteReaction from './siteReaction';
import { Dropzone } from '../lib/common';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from './firebase/firebaseAuth';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteScreenshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot:   false,
      snackOpen:    false,
      snackMessage: '',
      isLoading:    true,
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    if (this.props.isRegistration) {
      this.setState({ isLoading: false })
    } else {
      Api.getSiteScreenshot(this.props.siteId)
        .then(res => {
          this.setState({ screenshot: res.data.screenshot })
          this.setState({ isLoading:  false })
        })
        .catch(error => console.log(error));
    }
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleUpdate = (data) => {
    if (this.props.isRegistration) {
      this.setState({ screenshot: data });
    } else {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken(true)
            .then (token => this.updateSiteScreenshot(this.props.siteId, data, token, user.uid))
            .catch(error => console.log(error));
        }
      });
    }
  }

  handleDelete = () => {
    if (this.props.isRegistration) {
      this.setState({ screenshot: false });
    } else {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        user.getIdToken(true)
          .then (token => this.deleteSiteScreenshot(this.props.siteId, token, user.uid))
          .catch(error => console.log(error));
      });
    }
  }

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  updateSiteScreenshot = (siteId, data, token, uid) => {
    if (this.props.isRegistration) {
      this.setState({ screenshot: data });
    } else {
      this.setState({ snackMessage: 'Uploading...', snackOpen: true });
      Api.updateSiteScreenshot(siteId, data, token, uid)
        .then(res => {
          this.setState({ screenshot:   data })
          this.setState({ snackMessage: res.data.message });
        })
        .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error), snackOpen: true }));
    }
  }

  deleteSiteScreenshot = (siteId, token, uid) => {
    Api.deleteSiteScreenshot(siteId, token, uid)
      .then (res   => this.setState({ screenshot: false }))
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
          this.state.isLoading ?
            null
            :
            this.state.screenshot ?
              <Screenshot 
                c={c}
                dataUrl={this.state.screenshot}
                onUpdate={data => this.handleUpdate(data)}
                onDelete={() => this.handleDelete()}
                siteId={this.props.siteId}
                isRegistration={this.props.isRegistration}
                isMine={this.props.isMine}
              />
              :
              <Dropzone 
                component={() => <NoImage c={c} />} 
                callBack={data => this.handleUpdate(data)}
              />
        }
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.snackOpen}
          onClose={this.handleSnackClose}
          autoHideDuration={3000}
          message={<span id="message-id">{this.state.snackMessage}</span>}
        />
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
        height: 'auto',
      },
      height: 750,
    },

    pointer: {
      cursor: 'pointer',
    },

    screenshot: {
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
      [theme.breakpoints.up('md')]: {
        height: 690,
      },
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
const Screenshot = ({c, dataUrl, onUpdate, onDelete, siteId, isRegistration, isMine}) => {
  return (
    <React.Fragment>
      <div>
        <img alt="screenshot" className={c.screenshot} src={dataUrl} id="screenshot"/>
      </div>

      <CardActions className={c.screenshotActions}>
        <div>
          { isRegistration ? null : <SiteReaction siteId={siteId} /> }
        </div>
        { 
          isMine || isRegistration ?
            <div>
              <Button size="small" color="primary">
                <Dropzone caption="Change" callBack={onUpdate} />
              </Button>
              <Button size="small" color="primary" onClick={onDelete}>
                Delete
              </Button>
            </div>
            :
            null
        }
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
