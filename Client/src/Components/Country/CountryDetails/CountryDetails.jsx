import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
}));

const CountryDetail = ({ country }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={country?.coverImage} title={country?.name} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {country?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {country?.description}
        </Typography>
        <Typography variant="h6" component="h3">
          Images
        </Typography>
        <div>
          {country?.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryDetail;