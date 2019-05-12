// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Button         from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api      from '../lib/api';
import SiteItem      from './siteItem';
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
    this.getSiteList(page, this.props.uid);
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
    const c = this.props.classes;
    return (
      <div>
        { 
          this.props.uid ? 
              <div className={c.siteAdd}>
                <Button variant="contained" component={Link} to="/sites/register">Site add</Button>
              </div>
              :
              null
        }
        <InfiniteScroll
          initialLoad={true}
          loadMore={(page)=>this.getLoadMore(page)}
          hasMore={this.state.hasMoreItems} // hasMoreがtrueになるとデータを追加ロードするためのscrollイベントが除去される。
          loader={<LoaderBox key={0} />} // keyが必要。公式ドキュメントにも記載有り。https://github.com/CassetteRocks/react-infinite-scroller#props
          threshold={10}
        >
          <div className={c.list}>
            {this.renderList()}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => {
  return ({
    siteAdd: {
      marginLeft: 10,
    },

    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',

      //[theme.breakpoints.down('sm')]: {
      //  justifyContent: 'space-around',
      //},
    },
  });
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
SiteList.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(SiteList);
