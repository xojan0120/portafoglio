// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Card                    from '@material-ui/core/Card';
import CardActionArea          from '@material-ui/core/CardActionArea';
import CardContent             from '@material-ui/core/CardContent';
import CardMedia               from '@material-ui/core/CardMedia';
import Typography              from '@material-ui/core/Typography';
import { withStyles }          from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import styles from '../css/style'

// ----------------------------------------------------------------------------------------
// * Main Function
// ----------------------------------------------------------------------------------------
const SiteItem = (props) => {
  const c = props.classes;
  return (
    <Card className={c.card} component={Link} to={`/sites/${props.id}/detail`}>
      <CardActionArea>
        <CardMedia
          className={c.media}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography component="p">
            {props.comment}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// --------------------------------------------------------------------------------------
// PropTypes
// --------------------------------------------------------------------------------------
SiteItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

// --------------------------------------------------------------------------------------
// Export Module
// --------------------------------------------------------------------------------------
export default withStyles(styles)(SiteItem);
