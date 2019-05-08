// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Card           from '@material-ui/core/Card';
import CardMedia      from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import CardActions    from '@material-ui/core/CardActions';
import Button         from '@material-ui/core/Button';
import Typography     from '@material-ui/core/Typography';
import Snackbar       from '@material-ui/core/Snackbar';
import AccountCircle  from '@material-ui/icons/AccountCircle';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes from 'prop-types';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api     from '../lib/api';
import { Dropzone } from '../lib/common';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from './firebase/firebaseAuth';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class Avatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar:   false,
      user:     null,
    }

    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      user ? this.setState({user: user}) : this.setState({user: null});
    });


    Api.getUserAvatar(props.username)
      .then(res => {
        if (res.status === 200) {
          this.setState({ avatar: res.data.avatar });
        }
      })
      .catch(error => console.log(error));
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleUpload = (data) => {
    if (this.state.user) {
      this.state.user.getIdToken(true)
        .then (token => this.uploadAvatar(data, token, this.state.user.uid))
        .catch(error => console.log(error));
    }
  }

  handleDelete = () => {
    console.log("run handleDelete!");
    if (this.state.user) {
      this.state.user.getIdToken(true)
        .then (token => this.deleteAvatar(token, this.state.user.uid))
        .catch(error => console.log(error));
    }
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  uploadAvatar = (data, token, uid) => {
    Api.uploadAvatar(data, token, uid)
      .then(res => {
        if (res.status === 200) {
          this.setState({ avatar: data });
        }
      })
      .catch(error => console.log(error));
  }

  deleteAvatar = (token, uid) => {
    Api.deleteAvatar(token, uid)
      .then(res => {
        if (res.status === 200) {
          this.setState({ avatar: false });
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
      <div>
        <Card className={c.card}>
          { 
            this.state.avatar ?
              <ShowAvatar 
                c={c}
                avatar={this.state.avatar} 
                onUpload={data => this.handleUpload(data)}
                onDelete={()   => this.handleDelete()}
                user={this.state.user}
                authUser={this.props.authUser}
              />
              :
              <Dropzone 
                component={() => <NoImage c={c} />} 
                callBack={data => this.handleUpload(data)}
              />
          }
        </Card>
      </div>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
    card: {
      width: 200,
      height: 200,
    },

    media: {
      width: '80%',
      height: '80%',
      margin: 'auto',
    },

    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    noImage: {
      textAlign: 'center',
      cursor: 'pointer',
    },

    noImageIcon: {
      fontSize: '9rem',
    },
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
Avatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(Avatar);

// --------------------------------------------------------------------------------------
// Return component functions
// --------------------------------------------------------------------------------------
const ShowAvatar = ({c, avatar, onUpload, onDelete, user, authUser}) => {
  return (
    <React.Fragment>
      <CardMedia className={c.media} image={avatar} />
      {
        authUser ?
          <CardActions className={c.cardActions}>
            <Button size="small" color="primary">
              <Dropzone caption="Change" callBack={onUpload} />
            </Button>
            <Button size="small" color="primary" onClick={onDelete}>
              Delete
            </Button>
          </CardActions>
          :
          null
      }
    </React.Fragment>
  );
}

const NoImage = ({c}) => {
  return (
    <div className={c.noImage}>
      <AccountCircle className={c.noImageIcon} />
      <Typography className={c.noImageComment}>
        Click here to upload a screenshot.
      </Typography>
    </div>
  );
}
