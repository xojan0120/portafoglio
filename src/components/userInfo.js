// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import AccountCircle     from '@material-ui/icons/AccountCircle';
import Button            from '@material-ui/core/Button';
import Dialog            from '@material-ui/core/Dialog';
import DialogActions     from '@material-ui/core/DialogActions';
import DialogContent     from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle       from '@material-ui/core/DialogTitle';
import InputAdornment    from '@material-ui/core/InputAdornment';
import Snackbar          from '@material-ui/core/Snackbar';
import TextField         from '@material-ui/core/TextField';
import { withStyles }    from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes     from 'prop-types';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from './firebase/firebaseAuth';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api                   from '../lib/api';
import * as Cmn                   from '../lib/common';
import { cmnValidNicknameLength } from '../lib/constants';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname:     '',
      snackOpen:    false,
      alertOpen:    false,
      snackMessage: '',
      error:        false,
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    Api.getNickname(this.props.uid)
      .then(res => this.setState({ nickname: res.data.nickname }) )
      .catch(error => console.log(error));
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleChange = (event) => {
    if (event.target.value.length <= cmnValidNicknameLength) {
      this.setState({
        nickname: event.target.value,
        error:    false
      });
    } else {
      this.setState({
        error:   `Please use ${cmnValidNicknameLength} characters or less.`
      });
    }
  }

  handleUpdate = () => {
    if (this.validate()) {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken(true)
            .then (token => this.updateNickname(this.props.uid, token, this.state.nickname))
            .catch(error => console.log(error));
        }
      });
    }
  }

  handleDelete = () => {
    this.handleAlertClose();
    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true)
          .then (token => this.deleteAccount(token, this.props.uid))
          .catch(error => console.log(error));
      }
    });
  }

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  handleAlertOpen = () => {
    this.setState({ alertOpen: true });
  };

  handleAlertClose = () => {
    this.setState({ alertOpen: false });
  };

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  updateNickname = (uid, token, nickname) => {
    Api.updateNickname(uid, token, nickname) 
      .then(res => this.setState({ snackMessage: res.data.message, snackOpen: true }))
      .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error), snackOpen: true }));
  }

  deleteAccount = (token, uid) => {
    Api.deleteAccount(token, uid) 
      .then(res => {
        FirebaseAuth.userDelete(()=>this.deleteAccountSuccess(res),this.deleteAccountFailure);
      })
      .catch(error => {
        this.setState({ snackMessage: Cmn.getApiError(error), snackOpen: true })
      });
  }

  deleteAccountSuccess = (res) => {
    this.setState({ snackMessage: res.data.message, snackOpen: true });
    setTimeout(() => window.location.href = "/", 2000);
  }
  deleteAccountFailure = (error) => {
    this.setState({ snackMessage: 'Delete account failed.' })
  }

  validate = () => {
    let result = true;
    if (this.state.nickname.length === 0) {
      this.setState({ error: 'please input something.' });
      result = false;
    }
    return result;
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <div className={c.root}>
        <div className={c.userInfo}>
          <TextField 
            autoFocus={this.props.isMe}
            label="Nickname"
            value={this.state.nickname}
            onChange={this.props.isMe ? this.handleChange : null}
            className={c.nicknameField}
            error={!!this.state.error}
            helperText={this.state.error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle className={c.nicknameIcon} />
                </InputAdornment>
              ),
              className: c.nicknameInput
            }}
          />
          { 
            this.props.isMe ?
              <div className={c.actions}>
                <Button className={c.actionButton} variant="contained" onClick={this.handleUpdate}>Change</Button>
                <Button className={c.actionButton} variant="contained" onClick={this.handleAlertOpen}>Delete account</Button>
              </div>
              :
              null
          }
        </div>

        <Dialog
          open={this.state.alertOpen}
          onClose={this.handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete your account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              YES
            </Button>
            <Button onClick={this.handleAlertClose} color="primary" autoFocus>
              NO
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.snackOpen}
          onClose={this.handleSnackClose}
          autoHideDuration={3000}
          message={<span id="message-id">{this.state.snackMessage}</span>}
        />
      </div>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
    root: {
      margin : 20,
    },

    userInfo: {
      display:    'flex',
      alignItems: 'center',
    },

    nicknameField: {
    },

    nicknameInput: {
      fontSize: '2rem',
    },

    nicknameIcon: {
      fontSize: '2rem',
    },

    actions: {
    },

    actionButton: {
      marginLeft: 10,
      [theme.breakpoints.down('sm')]: {
        marginTop: 10,
      },
    },
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(UserInfo);
