// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Button         from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography     from '@material-ui/core/Typography';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes from 'prop-types';
import { 
  FaThumbsUp    as GoodIcon,
  FaGlassCheers as CoolIcon,
  FaStar        as GreatIcon,
  FaGrinSquint  as FunnyIcon,
  FaEye         as ViewIcon,
}                from 'react-icons/fa';
import update    from 'immutability-helper';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import * as Api from '../lib/api';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteReaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reactions: {
        good: 0,
      },
      view: 0,
    }

    Api.updateViewCount(this.props.siteId);
  }

  // --------------------------------------------------------------------------------------
  // * Lifecycle Methods
  // --------------------------------------------------------------------------------------
  componentDidMount = () => {
    console.log("run componentDidMount!");
    this.getReactionsCount();
    this.getViewCount();
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  getReactionsCount = () => {
    Api.getReactionsCount()
      .then (res   => { if (res.status === 200) this.setState({ reactions: res.data.reactions }) })
      .catch(error => console.log(error));
  }

  getViewCount = () => {
    Api.getViewCount()
      .then (res   => { if (res.status === 200) this.setState({ view: res.data.view }) })
      .catch(error => console.log(error));
  }

  // --------------------------------------------------------------------------------------
  // * Event handlers and Related Methods
  // --------------------------------------------------------------------------------------
  handleUpdate = (reaction) => {
    if (this.props.user) {
      this.props.user.getIdToken(true)
        .then (token => this.updateReactionCount(this.props.siteId, reaction, token, this.props.user.uid))
        .catch(error => console.log(error));
    }
  }

  // --------------------------------------------------------------------------------------
  // Other Methods
  // --------------------------------------------------------------------------------------
  updateReactionCount = (siteId, reaction, token, uid) => {
    Api.updateReactionCount(siteId, reaction, token, uid)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            reactions: update(this.state.reactions, { good: {$set: res.data.count} }),
          });
        }
      })
      .catch(error => console.log(error));
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <div>
        <Button 
          variant="contained"
          color="default"
          className={c.reactionButton}
          onClick={() => this.handleUpdate('good')}
        >
          <GoodIcon className={c.reactionIcon} />{this.state.reactions.good}
        </Button>
        {/*
        <Button variant="contained" color="default" className={c.reactionButton}>
          COOL<CoolIcon className={c.reactionIcon} />
        </Button>
        <Button variant="contained" color="default" className={c.reactionButton}>
          GREAT<GreatIcon className={c.reactionIcon} />
        </Button>
        <Button variant="contained" color="default" className={c.reactionButton}>
          FUNNY<FunnyIcon className={c.reactionIcon} />
        </Button>
        */}
        <span>
          <ViewIcon className={c.viewIcon} />
          <Typography inline variant="button" className={c.viewCount}>
            {this.state.view}
          </Typography>
        </span>
      </div>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------------------
const styles = theme => ({
  reactionButton: {
    [theme.breakpoints.up('md')]: {
      fontSize: 'large',
    },
    marginRight: 15,
  },

  reactionIcon: {
    marginRight:  5,
    marginBottom: 5,
  },

  viewIcon: {
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
    marginRight: 5,
  },

  viewCount: {
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
    verticalAlign: 'middle',
  },
});

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
SiteReaction.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(SiteReaction);
