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
import styles from '../css/style';
import {
  cmnValidOwnerLength,
  cmnValidSiteNameLength,
  cmnValidSiteUrlLength,
  cmnValidCreationPeriodMin,
  cmnValidCreationPeriodMax,
}             from '../lib/common';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner:      '',    error_owner:      false,
      siteName:   '',    error_siteName:   false,
      siteUrl:    '',    error_siteUrl:    false,
      period:      0,    error_period:     false,
      periodUnit: 'day',
    };
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleOwner = (event) => {
    if (event.target.value.length <= cmnValidOwnerLength) {
      this.setState({ owner: event.target.value, error_owner: false });
    } else {
      this.setState({ error_owner: `Please use ${cmnValidOwnerLength} characters or less.` });
    }
  }

  handleSiteName = (event) => {
    if (event.target.value.length <= cmnValidSiteNameLength) {
      this.setState({ siteName: event.target.value, error_siteName: false });
    } else {
      this.setState({ error_siteName: `Please use ${cmnValidSiteNameLength} characters or less.` });
    }
  }

  handleSiteUrl = (event) => {
    //const re = /(?:^|[\s　]+)((?:https?):\/\/[^\s　]+)/

    if (event.target.value.length <= cmnValidSiteUrlLength) {
      this.setState({ siteUrl: event.target.value, error_siteUrl: false });
    } else {
      this.setState({ error_siteUrl: `Please use ${cmnValidSiteUrlLength} characters or less.` });
    }
  }

  handlePeriod = (event) => {
    if (event.target.value >= cmnValidCreationPeriodMin &&
      event.target.value <= cmnValidCreationPeriodMax) {
      this.setState({ period: event.target.value, error_period: false });
    } else {
      this.setState({ error_period: true });
    }
  }

  handlePeriodUnit = (event) => {
    this.setState({ periodUnit: event.target.value });
  }

  handleSkill = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

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
          error={this.state.error_owner}
          onChange={(event)=>this.handleOwner(event)}
        />
        <SiteNameField 
          c={c}
          value={this.state.siteName}
          error={this.state.error_siteName}
          onChange={(event)=>this.handleSiteName(event)}
        />
        <SiteUrlField
          c={c}
          value={this.state.siteUrl}
          error={this.state.error_siteUrl}
          onChange={(event)=>this.handleSiteUrl(event)}
        />
        <Grid container alignItems="flex-end">
          <Grid item>
            <PeriodField
              c={c}
              value={this.state.period}
              error={this.state.error_period}
              onChange={(event)=>this.handlePeriod(event)}
            />
          </Grid>
          <Grid item>
            <PeriodUnitField
              c={c}
              value={this.state.periodUnit}
              onChange={(event)=>this.handlePeriodUnit(event)}
            />
          </Grid>
        </Grid>
        <SkillField
          c={c}
          onChange={(newValue, actionMeta)=>this.handleSkill(newValue, actionMeta)}
        />
      </form>
    );
  }
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
const OwnerField = ({c, value, error, onChange}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <OwnerIcon className={c.siteInfoIcon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="owner"
          label="Owner"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.siteInfoForm }}
          className={c.textField}
          value={value}
          onChange={onChange}
          margin="normal"
          placeholder="Owner nickname"
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
        <SiteIcon className={c.siteInfoIcon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="siteName"
          label="Site name"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.siteInfoForm }}
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
        <SiteUrlIcon className={c.siteInfoIcon}/>
      </Grid>
      <Grid item>
        <TextField
          required
          id="siteUrl"
          label="Site Url"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.siteInfoForm }}
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
        <PeriodIcon className={c.siteInfoIcon}/>
      </Grid>
      <Grid item>
        <TextField
          id="period"
          label="Creation period"
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: c.siteInfoForm }}
          className={classNames(c.textField, c.siteInfoPeriodForm)}
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

const PeriodUnitField = ({c, value, error, onChange}) => {
  const units = [
    { value: 'hour',  label: 'hour'  },
    { value: 'day',   label: 'day'   },
    { value: 'week',  label: 'week'  },
    { value: 'month', label: 'month' },
    { value: 'year',  label: 'year'  },
  ]
  return (
    <TextField
      id="periodUnit"
      select
      className={c.textField}
      value={value}
      onChange={onChange}
      InputProps={{ className: c.siteInfoForm }}
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

const SkillField = ({c, onChange}) => {
  const colourOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
  return (
    <CreatableSelect
      isMulti
      onChange={onChange}
      options={colourOptions}
    />
  );
}

