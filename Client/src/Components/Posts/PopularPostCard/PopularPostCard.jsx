import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns'; // Import date-fns for time formatting
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import LocationIcon from '../../../assets/icons/LocationIcon';
import Comments from '../../../assets/icons/Comments';
import Person from '../../../assets/icons/Person';
import CalendarSmall from '../../../assets/icons/CalendarSmall';
function PopularPostCard({ item, userId, small }) {
  const classes = useStyles();
  const history = useHistory();

  const timeSinceCreation = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });

  return (
    <Card className={classes.smallCard} onClick={() => history.push(`/stories/${item._id}`)}>
      <CardMedia className={classes.media} image={item.selectedFile} />
      <CardContent className={classes.content}>
        <div>
          <Typography gutterBottom className={classes.title}>
            {item.title}
          </Typography>
          <Typography>{item.name}</Typography>
          <Typography className={classes.description}>{item.message}</Typography>
        </div>
        <div className={classes.contentFooter}>
          <div className={classes.footerItem}>
            <CalendarSmall />
            <Typography variant="body2" color="textSecondary" className={classes.footerText}>
              {timeSinceCreation}
            </Typography>
          </div>
          <div className={classes.footerItem}>
            <Person />
            <Typography variant="body2" color="textSecondary" className={classes.footerText}>
              {item.creator.name}
            </Typography>
          </div>
          <div className={classes.footerItem}>
            <Comments />
            <Typography variant="body2" color="textSecondary" className={classes.footerText}>
              {item?.comments.length}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PopularPostCard;
