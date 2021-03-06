// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Button         from '@material-ui/core/Button';
import Card           from '@material-ui/core/Card';
import CardActions    from '@material-ui/core/CardActions';
import CommentIcon    from '@material-ui/icons/ModeComment';
import Grid           from '@material-ui/core/Grid';
import MenuItem       from '@material-ui/core/MenuItem';
import OwnerIcon      from '@material-ui/icons/AccountCircle';
import PeriodIcon     from '@material-ui/icons/AccessTime';
import SiteIcon       from '@material-ui/icons/WebAsset';
import SiteUrlIcon    from '@material-ui/icons/Link';
import SkillIcon      from '@material-ui/icons/Build';
import Snackbar       from '@material-ui/core/Snackbar';
import TextField      from '@material-ui/core/TextField';
import UpdateAtIcon   from '@material-ui/icons/CalendarToday';
import { withStyles } from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import CreatableSelect from 'react-select/lib/Creatable';
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import dateFormat      from 'dateformat';
import update          from 'immutability-helper';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api      from '../lib/api';
import * as Cmn      from '../lib/common';
import {
  cmnValidCommentLength,
  cmnValidCreationPeriodMax,
  cmnValidCreationPeriodMin,
  cmnValidSiteNameLength,
  cmnValidSiteUrlLength,
  cmnValidUsedSkillsQuantity,
  cmnValidUsedSkillLength,
}                    from '../lib/constants';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Firebase)
// -------------------------------------------------------------------------------------------------
import * as FirebaseAuth from './firebase/firebaseAuth';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteInfo extends React.Component {
  constructor(props) {
    super(props);

    const now = dateFormat(new Date(), "yyyy/mm/dd");

    this.state = {
      siteInfo: {
        owner:      '',
        siteName:   '',
        siteUrl:    '',
        period:      0,
        periodUnit: 'day',
        usedSkills: [],
        comment:    '',
        updateAt:   this.props.isRegistration ? now : '',
      },
      errors: {
        owner:      false,
        siteName:   false,
        siteUrl:    false,
        period:     false,
        usedSkills: false,
        comment:    false,
      },
      periodUnits:  [],
      skills:       [],
      snackOpen:    false,
      snackMessage: '',
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    this.getPeriodUnits();
    this.getSkills();
    this.getSiteInfo(this.props.siteId);

  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getPeriodUnits = () => {
    Api.getPeriodUnits()
      .then(res => this.setState({ periodUnits: res.data.periodUnits }) )
      .catch(error => console.log(error));
  }

  getSkills = () => {
    Api.getSkills()
      .then(res => this.setState({ skills: res.data.skills }) )
      .catch(error => console.log(error));
  }

  getSiteInfo = (siteId) => {
    if (this.props.isRegistration) {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        if (user) {
          Api.getNickname(user.uid)
            .then(res => {
                this.setState({ siteInfo: update(this.state.siteInfo, { owner: {$set: res.data.nickname} }) });
            })
            .catch(error => console.log(error));
        }
      });
    } else {
      Api.getSiteInfo(siteId)
        .then(res => this.setState({ siteInfo: res.data.siteInfo }) )
        .catch(error => console.log(error));
    }
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleSiteName = (event) => {
    if (event.target.value.length <= cmnValidSiteNameLength) {
      this.setState({
        siteInfo: update(this.state.siteInfo, { siteName: {$set: event.target.value} }),
        errors:   update(this.state.errors,   { siteName: {$set: false} })
      });
    } else {
      const msg = `Please use ${cmnValidSiteNameLength} characters or less.`; 
      this.setState({
        errors:   update(this.state.errors,   { siteName: {$set: msg} })
      });
    }
  }

  handleSiteUrl = (event) => {
    if (event.target.value.length <= cmnValidSiteUrlLength) {
      this.setState({
        siteInfo: update(this.state.siteInfo, { siteUrl: {$set: event.target.value} }),
        errors:   update(this.state.errors,   { siteUrl: {$set: false} })
      });
    } else {
      const msg = `Please use ${cmnValidSiteUrlLength} characters or less.`; 
      this.setState({
        errors:   update(this.state.errors,   { siteUrl: {$set: msg} })
      });
    }
  }

  handlePeriod = (event) => {
    if (event.target.value >= cmnValidCreationPeriodMin &&
      event.target.value <= cmnValidCreationPeriodMax) {
      this.setState({
        siteInfo: update(this.state.siteInfo, { period: {$set: event.target.value} }),
        errors:   update(this.state.errors,   { period: {$set: false} })
      });
    } else {
      this.setState({
        errors:   update(this.state.errors,   { period: {$set: true} })
      });
    }
  }

  handlePeriodUnit = (event) => {
    this.setState({
      siteInfo: update(this.state.siteInfo, { periodUnit: {$set: event.target.value} })
    });
  }

  handleUsedSkills = (newValue, actionMeta) => {
    if (newValue.length <= cmnValidUsedSkillsQuantity) {
      //console.group('Value Changed');
      //console.log(newValue);
      //console.log(`action: ${actionMeta.action}`);
      //console.groupEnd();
      if (this.validateSkillLength(newValue)) {
        this.setState({
          siteInfo: update(this.state.siteInfo, { usedSkills: {$set: newValue} }),
          errors:   update(this.state.errors,   { usedSkills: {$set: false} })
        });
      } else {
        const msg = `Skill name should be ${cmnValidUsedSkillLength} characters or less.`; 
        this.setState({
          errors:   update(this.state.errors, { usedSkills: {$set: msg} })
        });
      }
    } else {
      const msg = `Please select ${cmnValidUsedSkillsQuantity} or less.`; 
      this.setState({
        errors:   update(this.state.errors, { usedSkills: {$set: msg} })
      });
    }
  };

  validateSkillLength = (newValue) => {
    let result = true;
    newValue.forEach(item => {
      if (item.value.length > cmnValidUsedSkillLength) {
        result = false;
      }
    });
    return result;
  }

  handleComment = (event) => {
    if (event.target.value.length <= cmnValidCommentLength) {
      this.setState({
        siteInfo: update(this.state.siteInfo, { comment: {$set: event.target.value} }),
        errors:   update(this.state.errors,   { comment: {$set: false} })
      });
    } else {
      const msg = `Please use ${cmnValidCommentLength} characters or less.`; 
      this.setState({
        errors:   update(this.state.errors,   { comment: {$set: msg} })
      });
    }
  }

  validate = () => {
    let result = true;
    const newErrors = Object.assign({}, this.state.errors);

    if (this.state.siteInfo.siteName.length === 0) {
      newErrors.siteName = 'Please input something.';
      result = false;
    }

    if (this.state.siteInfo.siteUrl.length === 0) {
      newErrors.siteUrl = 'Please input something.';
      result = false;
    } else {
      const re = /(?:^|[\s　]+)((?:https?):\/\/[^\s　]+)/
      if (!this.state.siteInfo.siteUrl.match(re)) {
        newErrors.siteUrl = 'Invalid URL.';
        result = false;
      }
    }

    this.setState({ errors: newErrors });
    return result;
  }

  handleUpdate = (siteInfo) => {
    if (this.validate()) {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken(true)
            .then (token => {
              this.updateSiteInfo(this.props.siteId, siteInfo, token, user.uid);
            })
            .catch(error => console.log(error));
        }
      });
    }
  }

  handleCreate = (siteInfo) => {
    if (this.validate()) {
      FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken(true)
            .then (token => {
              const img = document.getElementById("screenshot");
              if (img) siteInfo['screenshot'] = img.src;
              this.createSiteInfo(siteInfo, token, user.uid)
            })
            .catch(error => console.log(error));
        }
      });
    }
  }

  handleDelete = () => {
    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true)
          .then (token => this.deleteSite(this.props.siteId, token, user.uid))
          .catch(error => console.log(error));
      }
    });
  }

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  updateSiteInfo = (siteId, siteInfo, token, uid) => {
    Api.updateSiteInfo(siteId, siteInfo, token, uid) 
      .then(res => {
        this.setState({ snackMessage: res.data.message, snackOpen: true });
      })
      .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error), snackOpen: true }));
  }

  createSiteInfo = (siteInfo, token, uid) => {
    Api.createSiteInfo(siteInfo, token, uid) 
      .then(res => {
        this.setState({ snackMessage: res.data.message, snackOpen: true });
        window.location.href = `/sites/${res.data.siteId}/detail`;
      })
      .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error), snackOpen: true }));
  }

  deleteSite = (siteId, token, uid) => {
    Api.deleteSite(siteId, token, uid) 
      .then(res => {
          this.setState({ snackMessage: res.data.message, snackOpen: true });
          setTimeout(() => window.location.href = `/users/${uid}/detail`, 2000);
      })
      .catch  (error => this.setState({ snackMessage: Cmn.getApiError(error), snackOpen: true }));
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <Card className={c.infoCard}>
        <form className={c.container} autoComplete="off">
          <SiteInfoTextField
            disabled={true} 
            required={false}
            Icon={OwnerIcon}
            id="owner"
            label="Owner"
            c={c}
            value={this.state.siteInfo.owner}
          />
          <SiteInfoTextField
            disabled={!this.props.isMine && !this.props.isRegistration}
            required={true}
            Icon={SiteIcon}
            id="siteName"
            label="Site name"
            c={c}
            value={this.state.siteInfo.siteName}
            onChange={(event)=>this.handleSiteName(event)}
            placeholder="Your site name"
            error={this.state.errors.siteName}
          />
          <SiteInfoTextField
            disabled={!this.props.isMine && !this.props.isRegistration}
            required={true}
            Icon={SiteUrlIcon}
            id="siteUrl"
            label="Site URL"
            c={c}
            value={this.state.siteInfo.siteUrl}
            onChange={(event)=>this.handleSiteUrl(event)}
            placeholder="Your site URL"
            error={this.state.errors.siteUrl}
          />
          <Grid container alignItems="flex-end">
            <Grid item>
              <PeriodField
                disabled={!this.props.isMine && !this.props.isRegistration}
                c={c}
                value={this.state.siteInfo.period}
                error={this.state.errors.period}
                onChange={(event)=>this.handlePeriod(event)}
              />
            </Grid>
            <Grid item>
              <PeriodUnitField
                disabled={!this.props.isMine && !this.props.isRegistration}
                c={c}
                value={this.state.siteInfo.periodUnit}
                onChange={(event)=>this.handlePeriodUnit(event)}
                units={this.state.periodUnits}
              />
            </Grid>
          </Grid>
          <UsedSkillsField
            disabled={!this.props.isMine && !this.props.isRegistration}
            c={c}
            value={this.state.siteInfo.usedSkills}
            error={this.state.errors.usedSkills}
            onChange={(newValue, actionMeta)=>this.handleUsedSkills(newValue, actionMeta)}
            skills={this.state.skills}
          />
          <CommentField
            disabled={!this.props.isMine && !this.props.isRegistration}
            c={c}
            value={this.state.siteInfo.comment}
            onChange={(event)=>this.handleComment(event)}
            error={this.state.errors.comment}
          />
          <SiteInfoTextField
            disabled={true}
            required={false}
            Icon={UpdateAtIcon}
            id="updateAt"
            label="Update at"
            c={c}
            value={this.state.siteInfo.updateAt}
            onChange={(event)=>this.handleComment(event)}
          />
        </form>

        {
          this.props.isMine || this.props.isRegistration ?
            <Actions
              c={c}
              siteInfo={this.state.siteInfo}
              onClickUpdate={() => this.handleUpdate(this.state.siteInfo)}
              onClickCreate={() => this.handleCreate(this.state.siteInfo)}
              onClickDelete={() => this.handleDelete()}
              isRegistration={this.props.isRegistration}
            />
            :
            null
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
  const baseFontSize = 25;
  return ({
    infoCard: {
      paddingLeft:  10,
      paddingRight: 30,

      [theme.breakpoints.down('sm')]: {
        height: 'auto',
      },
      height: 750,
    },

    form: {
      display:   'flex',
      alignItems:'center',
      marginBottom: 5,
    },

    formItem: {
      flexGrow: 1,
    },

    icon: {
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
      marginRight: 10,
    },

    infoActions: {
      display:        "flex",
      justifyContent: "flex-end",
    },

    input: {
      [theme.breakpoints.up('md')]: {
        fontSize: baseFontSize,
      },
    },

    periodForm: {
      display:   'flex',
      alignItems:'center',
    },

    periodInput: {
      [theme.breakpoints.up('md')]: {
        fontSize: baseFontSize,
      },
      width: 50,
    },

    periodFormLabel: {
      width: 120,
    },

    usedSkillsLabel: {
      color:        'rgba(0, 0, 0, 0.54)',
      padding:      0,
      fontSize:     '0.8rem',
      lineHeight:   1,
      marginTop:    15,
      marginBottom: 15,
    },

    commentForm: {
      width: '100%',
    },
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
SiteInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(SiteInfo);

// --------------------------------------------------------------------------------------
// Return component functions
// --------------------------------------------------------------------------------------
const SiteInfoTextField = ({
  disabled, required, Icon, id, label, c, value, onChange, placeholder, error
}) => {
  return (
    <div className={c.form}>
      <div>
        <Icon className={c.icon} />
      </div>
      <div className={c.formItem}> {/* flexGrow:1でないとTextFieldのfullWidthが効かない */}
        <TextField
          disabled={disabled}
          required={required}
          id={id}
          label={label}
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.input }}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder={placeholder}
          error={!!error}
          helperText={error}
          fullWidth
        />
      </div>
    </div>
  );
}

const PeriodField = ({disabled, c, value, error, onChange}) => {
  return (
    <div className={c.periodForm}>
      <div>
        <PeriodIcon className={c.icon}/>
      </div>
      <div className={c.formItem}>
        <TextField
          disabled={disabled}
          id="period"
          label="Creation period"
          InputLabelProps={{ shrink: true, className: c.periodFormLabel }}
          InputProps={{ className: c.periodInput }}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="0"
          type="number"
          error={!!error}
        />
      </div>
    </div>
  );
}

const PeriodUnitField = ({disabled, c, value, error, onChange, units}) => {
  return (
    <TextField
      disabled={disabled}
      id="periodUnit"
      select
      value={value}
      onChange={onChange}
      InputProps={{ className: c.periodUnitForm }}
      margin="normal"
    >
      {units.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

const UsedSkillsField = ({disabled, c, value, error, onChange, skills}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "none",
      borderTop:       "none" ,
      borderRight:     "none",
      borderLeft:      "none",
      borderBottom:    "1px solid black",
      borderRadius:    0,
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: "none",
    }),
    multiValueRemove: (base, state) => {
      return disabled ? { ...base, display: 'none' } : base;
    }
  }
  return (
    <div className={c.form}>
      <div>
        <SkillIcon className={c.icon}/>
      </div>
      <div className={c.formItem}>
        <div className={classNames(c.usedSkillsLabel, error ? "warning" : "")}>Used Skills</div>
        <div>
          <CreatableSelect
            isClearable={false}
            isDisabled={disabled}
            styles={customStyles}
            isMulti
            value={value}
            onChange={onChange}
            options={skills}
          />
        </div>
        <div className={classNames(c.usedSkillsLabel,"warning")}>{error}</div>
      </div>
    </div>
  );
}

const MultiValueRemove = () => {
  return null
}

const CommentField = ({disabled, c, value, onChange, error}) => {
  return (
    <div className={c.form}>
      <div>
        <CommentIcon className={c.icon}/>
      </div>
      <div className={c.formItem}>
        <TextField
          disabled={disabled}
          id="comment"
          label="Comment"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.commentForm }}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="Your comment"
          error={!!error}
          helperText={error}
          multiline={true}
          rows={6}
          fullWidth
        />
      </div>
    </div>
  );
}

const Actions = ({c, siteInfo, onClickUpdate, onClickCreate, onClickDelete, isRegistration}) => {
  return (
    <CardActions className={c.infoActions}>
      <Button size="small" color="primary" onClick={ isRegistration ? onClickCreate : onClickUpdate}>
        { isRegistration ? 'Save' : 'Update' }
      </Button>
      
      { 
        !isRegistration ?
          <Button size="small" color="primary" onClick={onClickDelete}>
            Delete Site
          </Button>
          :
          null
      }
    </CardActions>
  );
}
