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

class SiteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      hasMoreItems: true,
      page: null,
    };

    this.initialLoad();
  }

  initialLoad = () => {
    console.log("run initialLoad!")
    let page = parseInt(this.props.match.params.page);
    if (Number.isNaN(page)) {
      page = 1;
    }
    this.getSiteList(page);
  }

  getNextPage = (currentPath) => {
    let nextPage = 0;
    const currentPageNum = parseInt(pathParse(currentPath).base);
    if (Number.isNaN(currentPageNum)) {
      nextPage = 2;
    } else {
      nextPage = currentPageNum + 1;
    }
    return nextPage;
  }

  getSiteList = (page) => {
    const promise = Api.getSiteList(page, this.props.order);
    promise.then(res => {
      console.log(res.status);
      if (res.status === 200) {
        const newList = this.state.list.concat(res.data);
        this.setState({ 
          list: newList,
        });

        this.props.history.push(`/sites/${this.props.order}/${page}`);
      } else {
        this.setState({ hasMoreItems: false });
      }
    });
  }

  getLoadMore = () => {
    console.log("run getLoadMore!");
    const nextPage = this.getNextPage(window.location.pathname);
    this.getSiteList(nextPage);
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
      <InfiniteScroll
        initialLoad={false}
        loadMore={this.getLoadMore}
        hasMore={this.state.hasMoreItems} // hasMoreがtrueになるとデータを追加ロードするためのscrollイベントが除去される。
        loader={<LoaderBox key={0}/>} // keyが必要。公式ドキュメントにも記載有り。https://github.com/CassetteRocks/react-infinite-scroller#props
        threshold={10}
      >
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {this.renderList()}
        </div>
      </InfiniteScroll>
    );
  }
}

export default withRouter(SiteList);
