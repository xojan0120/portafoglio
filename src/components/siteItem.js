// -------------------------------------------------------------------------------------------------
// * Import Modules(React Standard)
// -------------------------------------------------------------------------------------------------
import React from 'react';

// -------------------------------------------------------------------------------------------------
// * Import Modules(MaterialUI)
// -------------------------------------------------------------------------------------------------
import Button                  from '@material-ui/core/Button';
import Card                    from '@material-ui/core/Card';
import CardActionArea          from '@material-ui/core/CardActionArea';
import CardActions             from '@material-ui/core/CardActions';
import CardContent             from '@material-ui/core/CardContent';
import CardMedia               from '@material-ui/core/CardMedia';
import Typography              from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { withStyles }          from '@material-ui/core/styles';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Third Party)
// -------------------------------------------------------------------------------------------------
import PropTypes from 'prop-types';

// -------------------------------------------------------------------------------------------------
// * Import Modules(Self Made)
// -------------------------------------------------------------------------------------------------
import styles   from '../css/style'

// ----------------------------------------------------------------------------------------
// * Main Function
// ----------------------------------------------------------------------------------------
const SiteItem = (props) => {
  const c = props.classes;
  return (
      <Card className={c.card}>
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
