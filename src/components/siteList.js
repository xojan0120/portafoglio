// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import { unstable_Box as Box } from '@material-ui/core/Box';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import { SyncLoader as Loader } from 'react-spinners';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import SiteItem from './siteItem';
import * as Api from '../lib/api';
import { LoaderBox } from '../lib/common';

const getSiteList = (self) => {
  const promise = Api.getSiteList();
  promise.then(res => {
    const list = [];
    res.data.forEach(data => {
      list.push(<SiteItem key={data.id} {...data} />);
    });
    self.setState({ 
      list: list,
      isLoading: false
    });
  });
}


class SiteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
    };
    getSiteList(this);
  }

  render = () => {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        { this.state.isLoading ?  <LoaderBox /> : this.state.list }
      </div>
    );
  }
}

export default SiteList;
