// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Button from '@material-ui/core/Button';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import InfiniteScroll              from 'react-infinite-scroller';
import { Link }                    from 'react-router-dom';
import pathParse                   from 'path-parse';
import { FaPlusSquare as AddIcon } from 'react-icons/fa';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import SiteItem      from './siteItem';
import * as Api      from '../lib/api';
import { LoaderBox } from '../lib/common';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:         [],
      hasMoreItems: true,
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getSiteList = (page, uid) => {
    Api.getSiteList(page, uid)
      .then(res => {
        const newList = this.state.list.concat(res.data.list);
        this.setState({ list: newList });
      })
      .catch(error => {
        this.setState({ hasMoreItems: false });
      });
  }

  getLoadMore = (page) => {
    console.log("run getLoadMore!");
    this.getSiteList(page, this.props.uid);
    console.log(page);
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  renderList = () => {
    const list = [];
    this.state.list.forEach(data => {
      list.push(<SiteItem key={data.id} {...data} />);
    });
    return list;
  }

  render = () => {
    return (
      <div>
        { this.props.uid ? <Button variant="contained" component={Link} to="/sites/register">Site add</Button> : null }
        <InfiniteScroll
          initialLoad={true}
          loadMore={(page)=>this.getLoadMore(page)}
          hasMore={this.state.hasMoreItems} // hasMoreがtrueになるとデータを追加ロードするためのscrollイベントが除去される。
          loader={<LoaderBox key={0} />} // keyが必要。公式ドキュメントにも記載有り。https://github.com/CassetteRocks/react-infinite-scroller#props
          threshold={10}
        >
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            {this.renderList()}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default SiteList;
