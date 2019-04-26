import React from 'react';

class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        site id {this.props.match.params.siteId}
      </div>
    );
  }
}

export default SiteDetail;
