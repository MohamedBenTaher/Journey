import React ,{useState}from 'react'
import useStyles from "./styles.js"
import { Card, CardActions,CardMedia,CardContent,Button,Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { deletePost ,likePost} from '../../../actions/posts.js';
const Post = ({post,setCurrentId}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.googleId || user?.result?._id;
  console.log('userid',userId)
  console.log('post creator',post.creator)
  const [likes, setLikes] = useState(post?.likes);
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const classes=useStyles();
  const dispatch=useDispatch();




  return (
  <Card className={classes.card} >
   <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
   <div className={classes.overlay}>
       <Typography variant='h6' >{post.name}</Typography>
       <Typography variant='body2' >{moment(post.createdAt).fromNow()}</Typography>
   </div>
   {userId==post?.creator ? ( 
   <div className={classes.overlay2}>
      <Button style={{color:'white'}} size="small" onClick={() => setCurrentId(post._id)}>
        <MoreHorizonIcon fontSize='medium'/>
      </Button>
     
   </div>
    ):null}
   <div className={classes.details}>
       <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=> `#${tag} `)}</Typography>
   </div>
   <Typography variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
   <CardContent>
     
   <Typography variant='body2'color="textSecondary" component='p'>{post.message}</Typography>
   </CardContent>
   <CardActions className={classes.cardActions}>
   <Button size="small" color="primary" disabled={!user?.result} onClick={()=> dispatch(likePost(post._id)) }>
          <Likes />
        </Button>
        {userId==post?.creator?
         (
      <Button color="primary" size="small" onClick={()=>{dispatch(deletePost(post._id))}} >
        <DeleteIcon />
        Delete
   
      </Button> 
        ):null
}
   </CardActions>
  </Card>
  );
}
export default Post