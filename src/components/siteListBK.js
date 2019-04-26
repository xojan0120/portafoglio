// -------------------------------------------------------------------------------------------------
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

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import SiteItem from './siteItem';
import * as API from '../lib/api';

const renderItem = () => {
  const promise = API.getSiteList();
  promise.then(res => {
    const list = [];
    res.data.forEach(data => {
      list.push(<SiteItem key={data.id} {...data} />);
    });
    console.log(list);
  });
}

const SiteList = (props) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {
        //siteListJson.map(data => {
        //  return <SiteItem key={data.id} {...data} />
        //})
        renderItem()
      }
    </div>
  );
}

export default SiteList;
