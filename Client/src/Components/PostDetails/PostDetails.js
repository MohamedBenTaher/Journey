import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card, CardContent, Chip } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { bookmarkPost, cancelBookmarkPost, getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ComentSection from './ComentSection';
import Comments from '../Comment/Comments';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { IconButton } from '@material-ui/core';
import { bookmarkResource, cancelBookmarkResource } from '../../actions/auth';

function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  console.log('state', posts);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();
  const history = useHistory()
  const classes = useStyles();
  const { id } = useParams()
  
  useEffect(() => {
    dispatch(getPost(id))
  }, [id])
  console.log('my post',post)
  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags?.join(',') }));
      setUser(JSON.parse(localStorage.getItem('profile')))
    }
  }, [post])
  
  if (!post ) return null;
  console.log('rendered post ', post)
  console.log('post file', post.selectedFile)
  
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  console.log('recommendedPosts', recommendedPosts)
  
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const openPost = (_id) => history.push(`/stories/${_id}`);
  console.log('my current user',user)

  const found=user?.result?.savedResources.find((res) => res.resourceId === post._id)
  console.log('found resource',found,user?.result?.savedResources )
  return (
    <>

      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" bold component="h2" className={classes.title}>{post.title}</Typography>
            <div className={classes.PostInformations}>
              {post.duration > 0 && (
                <div className={classes.info}>
                  <AccessTimeIcon />
                  {post.duration} days
                </div>
              )}
              <div className={classes.info}>
                {post?.destination?.name && post?.country.title ? (
                  <>
                    <LocationOnIcon />  {post?.destination?.name}, {post?.country?.title}
                  </>
                ) : post?.destination?.name ? (
                  <>
                    <LocationOnIcon />{post?.destination?.name}
                  </>
                ) : post?.country?.title ? (
                  <>
                    <LocationOnIcon /> {post?.country?.title}
                  </>
                ) : null}
              </div>
              {post.cost > 0 && (
                <div className={classes.info}>
                  <AttachMoneyIcon />
                  {post.cost} $
                </div>
              )}
              <Typography gutterBottom variant="h6" color="textSecondary" component="h3" className={classes.tags}>
                <LocalOfferOutlinedIcon />
                {post?.tags?.map((tag, index) => (
                  <div key={index} style={{ marginLeft: 10 }}>
                    {tag}
                    {index !== post.tags.length - 1 && ','}
                  </div>
                ))}
              </Typography>
            </div>
            <div className={classes.imageSection}>
              <IconButton className={classes.savePost} onClick={()=>{user && post?.bookmarkedBy?.indexOf(user?.result?._id)!==-1 ? dispatch(cancelBookmarkPost(post._id,user.result._id)):dispatch(bookmarkPost(post._id,user.result._id))}}>
                {post?.bookmarkedBy?.indexOf(user?.result?._id)!==-1 ? (
                  <BookmarkIcon style={{ color: 'white',fontSize: 32,zIndex:99}} />
                ) : (
                  <BookmarkBorderIcon style={{ color: 'white',fontSize: 32,zIndex:99}} />
                )}
              </IconButton>
              <img className={classes.media} src={post?.selectedFile} alt={post.title}/>
            </div>
            <Typography gutterBottom variant="body1" component="p" className={classes.message}>
              {post?.message.split('\n').map((paragraph, index) => (
                <p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>
              ))}
            </Typography>
            <Typography variant="h6">Created by: {post?.creator?.name}</Typography>
            <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            {post && (
              <Card>
                <CardContent>
                  <Comments entityId={id} entityType={'PostMessage'} user={user} />
                </CardContent>
              </Card>
            )}
            <Divider style={{ margin: '20px 0' }} />
          </div>
        </div>
        {!!recommendedPosts.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">You might also like:</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({ title, name, message, likedBy, selectedFile, _id }) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>
                    ))}
                    <br />
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likedBy?.length}</Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              ))}
            </div>
          </div>
        )}
      </Paper>
    </>
  )
}

export default PostDetails;