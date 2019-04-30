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
    };

  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    this.getPeriodUnits();
    this.getSkills();
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getPeriodUnits = () => {
    const promise = Api.getPeriodUnits();
    promise.then(res => {
      if (res.status === 200) {
        this.setState({ periodUnits: res.data });
      }
    });
  }

  getSkills = () => {
    const promise = Api.getSkills();
    promise.then(res => {
      if (res.status === 200) {
        this.setState({ skills: res.data });
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
      this.setState({ errorOwner: `Please use ${cmnValidCommentLength} characters or less.` });
    }
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <form className={c.container} autoComplete="off">
        <OwnerField 
          c={c}
          value={this.state.owner}
          error={this.state.errorOwner}
          onChange={(event)=>this.handleOwner(event)}
        />
        <SiteNameField 
          c={c}
          value={this.state.siteName}
          error={this.state.errorSiteName}
          onChange={(event)=>this.handleSiteName(event)}
        />
        <SiteUrlField
          c={c}
          value={this.state.siteUrl}
          error={this.state.errorSiteUrl}
          onChange={(event)=>this.handleSiteUrl(event)}
        />
        <Grid container alignItems="flex-end">
          <Grid item>
            <PeriodField
              c={c}
              value={this.state.period}
              error={this.state.errorPeriod}
              onChange={(event)=>this.handlePeriod(event)}
            />
          </Grid>
          <Grid item>
            <PeriodUnitField
              c={c}
              value={this.state.periodUnit}
              onChange={(event)=>this.handlePeriodUnit(event)}
              units={this.state.periodUnits}
            />
          </Grid>
        </Grid>
        <SkillField
          c={c}
          value={this.state.usedSkills}
          error={this.state.errorUsedSkills}
          onChange={(newValue, actionMeta)=>this.handleSkill(newValue, actionMeta)}
          skills={this.state.skills}
        />
        <CommentField 
          c={c}
          value={this.state.comment}
          error={this.state.errorComment}
          onChange={(event)=>this.handleComment(event)}
        />
      </form>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => ({
  form: {
    fontSize: 30,
  },

  icon: {
    fontSize: 50,
    marginRight: 10,
  },

  periodForm: {
    width: 90,
  },

  usedSkillsLabel: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '0.8rem',
    lineHeight: 1,
    marginTop: 15,
    marginBottom: 15,
  },

  usedSkillsForm: {
    width: 350,
  },
});

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
const OwnerField = ({c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <OwnerIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="owner"
          label="Owner"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.form }}
          className={c.textField}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="Your nickname"
          error={!!error}
          helperText={error}
        />
      </Grid>
    </Grid>
  );
}

const SiteNameField = ({c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <SiteIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="siteName"
          label="Site name"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.form }}
          className={c.textField}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="Your site name"
          error={!!error}
          helperText={error}
        />
      </Grid>
    </Grid>
  );
}

const SiteUrlField = ({c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <SiteUrlIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="siteUrl"
          label="Site URL"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.form }}
          className={c.textField}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="Your site URL"
          error={!!error}
          helperText={error}
        />
      </Grid>
    </Grid>
  );
}

const PeriodField = ({c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <PeriodIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          id="period"
          label="Creation period"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.form }}
          className={classNames(c.textField, c.periodForm)}
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

const PeriodUnitField = ({c, value, error, onChange, units}) => {
  return (
    <TextField
      id="periodUnit"
      select
      className={c.textField}
      value={value}
      onChange={onChange}
      InputProps={{ className: c.form }}
      SelectProps={{
        MenuProps: {
          className: c.menu,
        },
      }}
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

const SkillField = ({c, value, error, onChange, skills}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <SkillIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <div className={classNames(c.usedSkillsLabel, error ? "warning" : "")}>Used Skills</div>
        <div className={c.usedSkillsForm}>
          <CreatableSelect
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

const CommentField = ({c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <OwnerIcon className={c.icon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="comment"
          label="Comment"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.form }}
          className={c.textField}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="Your comment"
          error={!!error}
          helperText={error}
        />
      </Grid>
    </Grid>
  );
}
