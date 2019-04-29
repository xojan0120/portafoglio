// -------------------------------------------------------------------------------------------------
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
import PropTypes from 'prop-types';
import { 
  FaThumbsUp    as GoodIcon,
  FaGlassCheers as CoolIcon,
  FaStar        as GreatIcon,
  FaGrinSquint  as FunnyIcon,
  FaEye         as ViewIcon,
}                from 'react-icons/fa';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import styles from '../css/style';

// ----------------------------------------------------------------------------------------
// * Main Class
// ----------------------------------------------------------------------------------------
class SiteReaction extends React.Component {
  constructor(props) {
    super(props);
  }

  // --------------------------------------------------------------------------------------
  // Render Methods
  // --------------------------------------------------------------------------------------
  render() {
    const c = this.props.classes;
    return (
      <div>
        <Button variant="contained" color="default" className={c.reactionButton}>
          <GoodIcon className={c.reactionIcon} />100
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
        <span className={c.reactionView}>
          <ViewIcon /> 100
        </span>
      </div>
    );
  }
}

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
