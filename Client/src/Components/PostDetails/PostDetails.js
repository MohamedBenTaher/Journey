import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import ComentSection from './ComentSection';
function PostDetails() {
  const {post,posts,isLoading}=useSelector((state)=>state.posts);
  console.log('state',posts)
  const dispatch=useDispatch();
  const history=useHistory()
  const classes=useStyles();
  const {id}=useParams()
  useEffect(()=>{
    dispatch(getPost(id))
  },[id])
  useEffect(()=>{
    if(post){
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags?.join(',') }));
    }
  },[post])
  if (!post) return null;
  console.log('rendered post ',post)
  console.log('post file',post.selectedFile)
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  console.log('recommendedPosts',recommendedPosts)
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const openPost = (_id) => history.push(`/stories/${_id}`);
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
    <div className={classes.card}>
      <div className={classes.section}>
        <Typography variant="h3" component="h2">{post.title}</Typography>
        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
        <div className={classes.imageSection}>
        <img className={classes.media} src={post?.selectedFile} alt={post.title}/>       
         </div>
        <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
        <Typography variant="h6">Created by: {post?.creator?.name}</Typography>
        <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <ComentSection post={post}/>
        <Divider style={{ margin: '20px 0' }} />
      </div>

    </div>
    {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>
                  ))}
                  <br/>
                  </Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes?.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
  </Paper>
  )
}

export default PostDetails