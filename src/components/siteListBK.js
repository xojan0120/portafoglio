// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import InfiniteScroll from 'react-infinite-scroller';
import { withRouter } from 'react-router-dom';
import pathParse      from 'path-parse';

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
      page:         this.getPage(this.props.location.pathname),
    };
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    this.getSiteList(this.state.page, this.props.uid);
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getPage = (path) => {
    let page = parseInt(pathParse(path).base);
    if (Number.isNaN(page)) {
      page = 1;
    }
    return page;
  }

  getSiteList = (page, uid) => {
    Api.getSiteList(page, uid)
      .then(res => {
        if (res.status === 200) {
          const newList = this.state.list.concat(res.data.list);
          this.setState({ list: newList });

          if (!uid) {
            this.props.history.push(`/sites/${page}`);
            console.log("hoge");
          }
          this.setState({ page: page });
        } else {
          this.setState({ hasMoreItems: false });
        }
      })
      .catch(error => console.log(error));
  }

  getLoadMore = (page) => {
    debugger;
    console.log("run getLoadMore!");
    this.getSiteList(page + 1, this.props.uid);
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
      <InfiniteScroll
        initialLoad={false}
        loadMore={()=>this.getLoadMore(this.state.page)}
        hasMore={this.state.hasMoreItems} // hasMoreがtrueになるとデータを追加ロードするためのscrollイベントが除去される。
        loader={<LoaderBox key={0}/>} // keyが必要。公式ドキュメントにも記載有り。https://github.com/CassetteRocks/react-infinite-scroller#props
        threshold={10}
      >
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          {this.renderList()}
        </div>
      </InfiniteScroll>
    );
  }
}

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withRouter(SiteList);