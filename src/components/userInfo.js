// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import { withStyles } from '@material-ui/core/styles';
import TextField      from '@material-ui/core/TextField';
import AccountCircle  from '@material-ui/icons/AccountCircle';
import Button         from '@material-ui/core/Button';
import Snackbar       from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';

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
      snackMessage: '',
      error:        false,
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    Api.getUserInfo(this.props.uid)
      .then(res => { if (res.status === 200) this.setState({ nickname: res.data.userInfo.nickname }) })
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

  handleUpdate = (event) => {
    if (this.props.user && this.validate()) {
      this.props.user.getIdToken(true)
        .then (token => this.updateNickname(this.props.uid, token, this.state.nickname))
        .catch(error => console.log(error));
    }
  }

  handleDelete = (event) => {
    this.props.user.getIdToken(true)
      .then (token => this.deleteAccount(this.props.uid, token))
      .catch(error => console.log(error));
  }

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  updateNickname = (uid, token, nickname) => {
    Api.updateNickname(uid, token, nickname) 
      .then(res => {
        if (res.status === 200) {
          this.setState({ snackMessage: res.data.message });
        } else {
          this.setState({ snackMessage: res.data.message });
        }
      })
      .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error) }))
      .finally(()    => this.setState({ snackOpen: true }));
  }

  deleteAccount = (uid, token) => {
    Api.updateNickname(uid, token) 
      .then(res => {
        if (res.status === 200) {
          FirebaseAuth.signOut();
          this.setState({ snackMessage: res.data.message });
          setTimeout(() => window.location.href = "/", 2000);
        } else {
          this.setState({ snackMessage: res.data.message });
        }
      })
      .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error) }))
      .finally(()    => this.setState({ snackOpen: true }));
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
                <Button className={c.actionButton} variant="contained" onClick={this.handleDelete}>Delete account</Button>
              </div>
              :
              null
          }
        </div>
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
