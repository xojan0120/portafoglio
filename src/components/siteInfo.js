// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import TextField      from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import OwnerIcon      from '@material-ui/icons/AccountCircle';
import SiteIcon       from '@material-ui/icons/WebAsset';
import SiteUrlIcon    from '@material-ui/icons/Link';
import PeriodIcon     from '@material-ui/icons/AccessTime';
import SkillIcon      from '@material-ui/icons/Build';
import Grid           from '@material-ui/core/Grid';
import MenuItem       from '@material-ui/core/MenuItem';
import CommentIcon    from '@material-ui/icons/ModeComment';
import UpdateAtIcon   from '@material-ui/icons/CalendarToday';
import Card           from '@material-ui/core/Card';
import CardActions    from '@material-ui/core/CardActions';
import Button         from '@material-ui/core/Button';
import Snackbar       from '@material-ui/core/Snackbar';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import CreatableSelect from 'react-select/lib/Creatable';
import update          from 'immutability-helper';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api from '../lib/api';
import '../css/common.scss';
import {
  cmnValidOwnerLength,
  cmnValidSiteNameLength,
  cmnValidSiteUrlLength,
  cmnValidCreationPeriodMin,
  cmnValidCreationPeriodMax,
  cmnValidUsedSkillsQuantity,
  cmnValidCommentLength,
}               from '../lib/constants';
import * as Cmn from '../lib/common';

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

    this.state = {
      siteInfo: {
        owner:      '',
        siteName:   '',
        siteUrl:    '',
        period:      0,
        periodUnit: 'day',
        usedSkills: [],
        comment:    '',
        updateAt:   '',
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
      authOwner:    false,
      snackOpen:    false,
      snackMessage: '',
      user:         null,
    };

    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      if(user) {
        Api.authSiteOwner(props.siteId, user.email)
          .then(res => {
            if (res.status === 200 && res.data.result === "true") {
              this.setState({ authOwner: true });
            } else {
              this.setState({ authOwner: false });
            }
          })
          .catch(error => console.log(error));
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    this.getPeriodUnits();
    this.getSkills();
    this.getSiteInfo();
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getPeriodUnits = () => {
    Api.getPeriodUnits()
      .then(res => { if (res.status === 200) this.setState({ periodUnits: res.data.periodUnits }) })
      .catch(error => console.log(error));
  }

  getSkills = () => {
    Api.getSkills()
      .then(res => { if (res.status === 200) this.setState({ skills: res.data.skills }) })
      .catch(error => console.log(error));
  }

  getSiteInfo = () => {
    Api.getSiteInfo()
      .then(res => { if (res.status === 200) this.setState({ siteInfo: res.data.siteInfo }) })
      .catch(error => console.log(error));
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
    //const re = /(?:^|[\s　]+)((?:https?):\/\/[^\s　]+)/

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
    // TODO: 入力されたスキル名の長さもチェックする(モデル側は10文字)
    if (newValue.length <= cmnValidUsedSkillsQuantity) {
      console.group('Value Changed');
      console.log(newValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
      this.setState({
        siteInfo: update(this.state.siteInfo, { usedSkills: {$set: newValue} }),
        errors:   update(this.state.errors,   { usedSkills: {$set: false} })
      });
    } else {
      const msg = `Please select ${cmnValidUsedSkillsQuantity} or less.`; 
      this.setState({
        errors:   update(this.state.errors,   { usedSkills: {$set: msg} })
      });
    }
  };

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

  handleUpdate = (siteInfo) => {
    if (this.state.user) {
      this.state.user.getIdToken(true)
        .then (token => this.updateSiteInfo(siteInfo, token, this.state.user.uid))
        .catch(error => console.log(error) );
    }
  }

  updateEmail = () => {
    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      if(user) {
        user.updateEmail("xojan0120.rails@gmail.com").then(function() {
          console.log("update email");
        }).catch(function(error) {
          console.log(error);
        });
      }
    });
  }

  updateSiteInfo = (siteInfo, token, uid) => {
    Api.updateSiteInfo(siteInfo, token, uid) 
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

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

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
            disabled={!this.state.authOwner}
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
            disabled={!this.state.authOwner}
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
                disabled={!this.state.authOwner}
                c={c}
                value={this.state.siteInfo.period}
                error={this.state.errors.period}
                onChange={(event)=>this.handlePeriod(event)}
              />
            </Grid>
            <Grid item>
              <PeriodUnitField
                disabled={!this.state.authOwner}
                c={c}
                value={this.state.siteInfo.periodUnit}
                onChange={(event)=>this.handlePeriodUnit(event)}
                units={this.state.periodUnits}
              />
            </Grid>
          </Grid>
          <UsedSkillsField
            disabled={!this.state.authOwner}
            c={c}
            value={this.state.siteInfo.usedSkills}
            error={this.state.errors.usedSkills}
            onChange={(newValue, actionMeta)=>this.handleUsedSkills(newValue, actionMeta)}
            skills={this.state.skills}
          />
          <CommentField
            disabled={!this.state.authOwner}
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
          this.state.authOwner ?
            <Actions
              c={c}
              siteInfo={this.state.siteInfo}
              onClick={() => this.handleUpdate(this.state.siteInfo)}
            />
            :
            ""
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
        height:     '100%',
      },
      [theme.breakpoints.up('md')]: {
        height:     750,
      },
    },

    form: {
      display:   'flex',
      alignItems:'center',
      marginBottom: 10,
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
      <div classNmae={c.formItem}>
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

const Actions = ({c, siteInfo, onClick}) => {
  return (
    <CardActions className={c.infoActions}>
      <Button size="small" color="primary" onClick={onClick}>
        Update
      </Button>
      <Button size="small" color="primary">
        Delete Site
      </Button>
    </CardActions>
  );
}