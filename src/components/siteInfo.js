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

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import CreatableSelect from 'react-select/lib/Creatable';

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
      owner:       '',    errorOwner:      false,
      siteName:    '',    errorSiteName:   false,
      siteUrl:     '',    errorSiteUrl:    false,
      period:       0,    errorPeriod:     false,
      periodUnit:  'day',
      usedSkills:  [],    errorUsedSkills: false,
      periodUnits: [],
      skills:      [],
      comment:     '',    errorComment:    false,
      updateAt:    '',
      authOwner:   false,
    };

    FirebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      const promise = Api.authSiteOwner(props.siteId, user.email);
      promise.then(res => {
        if (res.status === 200 && res.data.result === "true") {
          this.setState({ authOwner: true });
        } else {
          this.setState({ authOwner: false });
        }
      });
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
    const promise = Api.getPeriodUnits();
    promise.then(res => {
      if (res.status === 200) {
        //this.setState(res.data.periodUnits);
        this.setState({ periodUnits: res.data.periodUnits });
      }
    });
  }

  getSkills = () => {
    const promise = Api.getSkills();
    promise.then(res => {
      if (res.status === 200) {
        this.setState({ skills: res.data.skills });
      }
    });
  }

  getSiteInfo = () => {
    const promise = Api.getSiteInfo();
    promise.then(res => {
      if (res.status === 200) {
        this.setState(res.data.siteInfo);
      }
    });
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleOwner = (event) => {
    if (event.target.value.length <= cmnValidOwnerLength) {
      this.setState({ owner: event.target.value, errorOwner: false });
    } else {
      this.setState({ errorOwner: `Please use ${cmnValidOwnerLength} characters or less.` });
    }
  }

  handleSiteName = (event) => {
    if (event.target.value.length <= cmnValidSiteNameLength) {
      this.setState({ siteName: event.target.value, errorSiteName: false });
    } else {
      this.setState({ errorSiteName: `Please use ${cmnValidSiteNameLength} characters or less.` });
    }
  }

  handleSiteUrl = (event) => {
    //const re = /(?:^|[\s　]+)((?:https?):\/\/[^\s　]+)/

    if (event.target.value.length <= cmnValidSiteUrlLength) {
      this.setState({ siteUrl: event.target.value, errorSiteUrl: false });
    } else {
      this.setState({ errorSiteUrl: `Please use ${cmnValidSiteUrlLength} characters or less.` });
    }
  }

  handlePeriod = (event) => {
    if (event.target.value >= cmnValidCreationPeriodMin &&
      event.target.value <= cmnValidCreationPeriodMax) {
      this.setState({ period: event.target.value, errorPeriod: false });
    } else {
      this.setState({ errorPeriod: true });
    }
  }

  handlePeriodUnit = (event) => {
    this.setState({ periodUnit: event.target.value });
  }

  handleSkill = (newValue, actionMeta) => {
    // TODO: 入力されたスキル名の長さもチェックする(モデル側は10文字)
    if (newValue.length <= cmnValidUsedSkillsQuantity) {
      console.group('Value Changed');
      console.log(newValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
      this.setState({ usedSkills: newValue, errorUsedSkills: false });
    } else {
      this.setState({ errorUsedSkills: `Please select ${cmnValidUsedSkillsQuantity} or less.` });
    }
  };

  handleComment = (event) => {
    if (event.target.value.length <= cmnValidCommentLength) {
      this.setState({ comment: event.target.value, errorComment: false });
    } else {
      this.setState({ errorComment: `Please use ${cmnValidCommentLength} characters or less.` });
    }
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
            required={true}
            Icon={OwnerIcon}
            id="owner"
            label="Owner"
            c={c}
            value={this.state.owner}
            onChange={(event)=>this.handleOwner(event)}
            error={this.state.errorOwner}
          />
          <SiteInfoTextField
            disabled={!this.state.authOwner}
            required={true}
            Icon={SiteIcon}
            id="siteName"
            label="Site name"
            c={c}
            value={this.state.siteName}
            onChange={(event)=>this.handleSiteName(event)}
            placeholder="Your site name"
            error={this.state.errorSiteName}
          />
          <SiteInfoTextField
            disabled={!this.state.authOwner}
            required={true}
            Icon={SiteUrlIcon}
            id="siteUrl"
            label="Site URL"
            c={c}
            value={this.state.siteUrl}
            onChange={(event)=>this.handleSiteUrl(event)}
            placeholder="Your site URL"
            error={this.state.errorSiteUrl}
          />
          <Grid container alignItems="flex-end">
            <Grid item>
              <PeriodField
                disabled={!this.state.authOwner}
                c={c}
                value={this.state.period}
                error={this.state.errorPeriod}
                onChange={(event)=>this.handlePeriod(event)}
              />
            </Grid>
            <Grid item>
              <PeriodUnitField
                disabled={!this.state.authOwner}
                c={c}
                value={this.state.periodUnit}
                onChange={(event)=>this.handlePeriodUnit(event)}
                units={this.state.periodUnits}
              />
            </Grid>
          </Grid>
          <SkillField
            disabled={!this.state.authOwner}
            c={c}
            value={this.state.usedSkills}
            error={this.state.errorUsedSkills}
            onChange={(newValue, actionMeta)=>this.handleSkill(newValue, actionMeta)}
            skills={this.state.skills}
          />
          <CommentField
            disabled={!this.state.authOwner}
            c={c}
            value={this.state.comment}
            onChange={(event)=>this.handleComment(event)}
            error={this.state.errorComment}
          />
          <SiteInfoTextField
            disabled={true}
            required={false}
            Icon={UpdateAtIcon}
            id="updateAt"
            label="Update at"
            c={c}
            value={this.state.updateAt}
            onChange={(event)=>this.handleComment(event)}
          />
        </form>

        { this.state.authOwner ? <Actions c={c} /> : "" }
      </Card>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  const baseFontSize = 30;
  const baseWidth    = 400;
  return ({
    infoCard: {
      paddingLeft: 20,
      height:      "100%",
      width:       "90%",
    },

    infoActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    form: {
      fontSize: baseFontSize,
      width:    baseWidth,
    },

    icon: {
      fontSize:    50,
      marginRight: 10,
    },

    periodFormLabel: {
      width: 120,
    },

    periodForm: {
      fontSize: baseFontSize,
      width:    90,
    },

    periodUnitForm: {
      fontSize: baseFontSize,
    },

    usedSkillsLabel: {
      color:        'rgba(0, 0, 0, 0.54)',
      padding:      0,
      fontSize:     '0.8rem',
      lineHeight:   1,
      marginTop:    15,
      marginBottom: 15,
    },

    usedSkillsForm: {
      width: baseWidth,
    },

    commentForm: {
      fontSize: 15,
      width:    baseWidth,
      verticalAlign: "bottom !important",
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
    <Grid container alignItems="center">
      <Grid item>
        <Icon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          disabled={disabled}
          required={required}
          id={id}
          label={label}
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.form }}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder={placeholder}
          error={!!error}
          helperText={error}
        />
      </Grid>
    </Grid>
  );
}

const PeriodField = ({disabled, c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <PeriodIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          disabled={disabled}
          id="period"
          label="Creation period"
          InputLabelProps={{ shrink: true, className: c.periodFormLabel }}
          InputProps={{ className: c.periodForm }}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="0"
          type="number"
          error={!!error}
        />
      </Grid>
    </Grid>
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

const SkillField = ({disabled, c, value, error, onChange, skills}) => {
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
    <Grid container alignItems="center">
      <Grid item>
        <SkillIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <div className={classNames(c.usedSkillsLabel, error ? "warning" : "")}>Used Skills</div>
        <div className={c.usedSkillsForm}>
          <CreatableSelect
            isDisabled={disabled}
            styles={customStyles}
            isMulti
            value={value}
            onChange={onChange}
            options={skills}
          />
        </div>
        <div className={classNames(c.usedSkillsLabel,"warning")}>{error}</div>
      </Grid>
    </Grid>
  );
}

const CommentField = ({disabled, c, value, onChange, error}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <CommentIcon className={c.icon}/>
      </Grid>
      <Grid item>
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
        />
      </Grid>
    </Grid>
  );
}

const Actions = ({c}) => {
  return (
    <CardActions className={c.infoActions}>
      <Button size="small" color="primary" onClick={() => Api.updateSiteInfo( {} , 'TEST-TOKEN' )} >
        Update
      </Button>
      <Button size="small" color="primary">
        Delete Site
      </Button>
    </CardActions>
  );
}
