// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>user detail {this.props.match.params.username}</div>
    );
  }
}

export default UserDetail;
