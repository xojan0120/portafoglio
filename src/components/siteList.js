// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import InfiniteScroll           from 'react-infinite-scroller';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import SiteItem      from './siteItem';
import * as Api      from '../lib/api';
import { LoaderBox } from '../lib/common';


class SiteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
      hasMoreItems: true,
    };
    this.getSiteList(props.order);
  }

  getSiteList = (order) => {
    const promise = Api.getSiteList(order);
    promise.then(res => {
      const newList = this.state.list.concat(res.data);
      this.setState({ 
        list: newList,
        isLoading: false
      });
    });
  }

  renderList = () => {
    const list = [];
    this.state.list.forEach(data => {
      list.push(<SiteItem key={data.id} {...data} />);
    });
    return list;
  }

  render = () => {
    return (
      //<InfiniteScroll
      //  pageStart={0}
      //  loadMore={page => this.getSiteList(page)}
      //  hasMore={this.state.hasMoreItems}
      //  loader={<LoaderBox />}
      //  threshold={10}
      //>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {this.renderList()}
        </div>
      //</InfiniteScroll>
    );
  }
}

export default SiteList;
