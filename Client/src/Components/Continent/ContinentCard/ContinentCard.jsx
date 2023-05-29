import React ,{useState}from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Typography,IconButton } from '@material-ui/core';
import Morocco from '../../../Images/Morooco.jpg'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useHistory } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';
const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
        position: 'relative',
        width: '100%',
        height: 400,

        margin: 'auto',
        transition: 'all 0.5s',
        borderRadius:'15px',
        // '&:hover': {
        //   transform: 'scale(1.05)',
        //   '& $content': {
        //     opacity: 1,
        //   },
        // },
      },
    backgroundImage: {
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(70%)',
        transition: 'all .5s ease-in-out',
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: '#fff',
        opacity: 1,
        width:'100%',
        transition: 'all 0.5s',
    },
    likeButton:{
        position:'absolute',
        top:'10px',
        right:'10px',
        color:'#fff',
        '&:hover':{
            color:'#fff',
            backgroundColor: 'rgba(10, 10, 10, 0.5)'
            },
        zIndex:99
    },
    title: {
      fontWeight: 'bold',
      fontSize:'2rem',
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      fontWeight:'bold',
      fontSize: '0.9rem',
    },
  })
);

const ContinentCard = (continent) => {
  const history=useHistory()
  const classes = useStyles();
  const [liked,setLiked]=useState(false)
  console.log('contient car',continent)
  return (
    <Card className={classes.card} >
      <CardMedia image={continent?.continent.coverImage} alt={continent?.continent.name} className={classes.backgroundImage} onClick={()=>history.push(`/continents/${continent.continent._id}`)} />
      <IconButton className={classes.likeButton} onClick={()=>setLiked((prev)=>!prev)}>
        {liked ?( <FavoriteOutlinedIcon style={{color:'white'}}/>):
        (<FavoriteBorderOutlinedIcon style={{color:'white'}} />)
        }
      </IconButton>
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {continent?.continent.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContinentCard;