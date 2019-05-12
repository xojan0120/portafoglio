// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import { withStyles } from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes     from 'prop-types';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api      from '../lib/api';
import * as Cmn      from '../lib/common';
import NotFound      from './notFound';
import SiteList      from './siteList';
import UserInfo      from './userInfo';
import { LoaderBox } from '../lib/common';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMe:       false,
      isChecking: true,
      isNotFound: false,
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    Cmn.judgeUser(this, this.props.match.params.uid);
    Api.checkUser(this.props.match.params.uid)
      .then (res   => this.setState({ isNotFound: false }))
      .catch(error => this.setState({ isNotFound: true  }))
      .finally(()  => this.setState({ isChecking: false }));
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    return (
      this.state.isChecking ?
        <LoaderBox />
        :
        this.state.isNotFound ?
          <NotFound />
          :
          <div>
            <UserInfo
              uid={this.props.match.params.uid}
              isMe={this.state.isMe}
            />
            <SiteList uid={this.props.match.params.uid} />
          </div>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(UserPage);
