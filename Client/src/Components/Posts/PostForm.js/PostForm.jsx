import React, { useState, useEffect } from 'react'
import useStyles from "./styles.js"
import { TextField, Typography, Button, Paper, Modal, Fade,TextareaAutosize,FormControl,InputLabel,Select,MenuItem } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { createPost, updatePost } from '../../../actions/posts.js';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import { getCountries } from '../../../actions/country.js';
import { getDestinations ,getDestinationByCountry } from '../../../actions/destinations.js';
import { deleteS3Image } from '../../../api/index.js';

const PostForm = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const {id}=useParams()
  const statePos=useSelector((state)=>state)
  console.log('statte',statePos)
  const post = useSelector((state) => id ? state?.posts.posts?.find((p) => p._id === id) : null);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [locations,setLocations]=useState([])
  const [postData, setPostData] = useState({
    title: '', message: '', tags: '',country:'',city:'', selectedFile: '',creator:user?.result?._id,locations:[]
  });


  const countries=useSelector((state)=>state.countries)
  console.log('feteched countires',countries)
  const destinations=useSelector((state)=>state.destinations)
  console.log('fetched',destinations)
  const location=useSelector((state)=>state.loations)
  const handleCountryChange = (e) => {
    setPostData({...postData,country:e.target.value});
  };
  const handleCityChange = (e) => {
    console.log('city',e.target.value)
    setPostData({...postData,city:e.target.value});
  };
  const userId=user?.result?._id
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data',postData,postData.country)
    const formData=new FormData()
    formData.append('title',postData.title)
    formData.append('message',postData.message)
    formData.append('tags',postData.tags)
    formData.append('country',postData.country)
    formData.append('city',postData.city)
    formData.append('user',userId)
    formData.append('image',postData.selectedFile[0])
    formData.append('creator',postData.creator)
    if (id ) {
      console.log('called updatePost')
    
      dispatch(updatePost(id, formData))
      clear();
    }
    else {
      dispatch(createPost(formData));

      clear();
    }
  }
  useEffect(()=>{
    dispatch(getCountries())
    dispatch(getDestinations())
  },[])
  useEffect(() => {
    if (post) setPostData(post)
    if (!post?.title) clear();

  }, [post])
  const clear = () => {
    // setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '',country:'',city:'',location:'',creator:user?.result?._id ,cost:0,duration:0});
  }
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create Your memories
        </Typography>

      </Paper>
    )

  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log('uploaded file',base64String)
    setPostData({  ...postData, selectedFile: file })
  } 

  useEffect(() => {
    return () => {
      if (postData.selectedFile) {
       
        URL.revokeObjectURL(postData.selectedFile);
      }
    };
  }, [postData.selectedFile]);
  useEffect(()=>{
    setUser(
      JSON.parse(localStorage.getItem('profile'))
    )
},[])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({       
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
    console.log('accepted cover',acceptedFiles)
    setPostData({ ...postData, selectedFile: acceptedFiles });
    console.log(postData)
  },
 });


  return (
    
          <div className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} encType="multipart/form-data">
              <Typography variant='h6'>{ id? 'Update your Memory' : 'create A Memory'}</Typography>

              <TextField
                name='title'
                variant='outlined'
                label='Title'
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

              <TextField
                name='message' 
                variant='outlined'
                label='Message  '
                fullWidth
                multiline
                InputProps={{
                    style: {
                        width: '100%',
                        minHeight: '100px',
                        resize: 'vertical',
                        padding: 5,
                        // borderRadius: '16px',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        boxSizing: 'border-box',
                        outline: 'none',
                    },
                  }}
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

                <TextField
                  name='duration'
                  variant='outlined'
                  label='Duration in days'
                  type='number'
                  fullWidth
                  value={postData.duration}
                  onChange={(e) => setPostData({ ...postData, duration: e.target.value })} />

                <TextField
                  name='cost'
                  variant='outlined'
                  label='Approximate Cost'
                  type='number'
                  fullWidth
                  value={postData.cost}
                  onChange={(e) => setPostData({ ...postData, cost: e.target.value })} />
                 
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel>Select Country</InputLabel>
                    <Select value={postData.country} onChange={(e)=>{
                        dispatch(getDestinationByCountry(e.target.value))
                        setPostData({...postData,country:e.target.value})
                        
                }} label="Select Country">
                        {countries?.countries?.map((country) => (
                        <MenuItem key={country._id} value={country._id}>
                            {country.title}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel>Select Country</InputLabel>
                    <Select value={postData.country} onChange={(e)=>{
                        setPostData({...postData,country:e.target.value})
                        
                }} label="Select Country">
                        {countries?.countries?.map((country) => (
                        <MenuItem key={country._id} value={country._id}>
                            {country.title}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel>Select Locations</InputLabel>
                    <Select 
                        value={postData.country} 
                        onChange={(e)=>{
                        dispatch(getDestinationByCountry(e.target.value))
                        setPostData({...postData,country:e.target.value})}} 
                        label="Select Country"
                        multiple
                        >
                        {countries?.countries?.map((country) => (
                        <MenuItem key={country._id} value={country._id}>
                            {country.title}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {destinations?.destinations?.length>0&&(
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel>Select a city</InputLabel>
                    <Select value={postData.city} onChange={(e)=>{setPostData({...postData,city:e.target.value})}} label="Select a city          ">
                        {destinations?.destinations?.map((city) => (
                        <MenuItem key={city._id} value={city._id}>
                            {city.title}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                )}
         
              <TextField
                name='tags'
                variant='outlined'
                label='tags'
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                
                  {!postData.selectedFile&&(<>
                <div {...getRootProps()} className={classes.dropZone}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the file here...</p>
                    ) : (
                        <p>Drag 'n' drop a file here, or click to select a file</p>
                    )}
                    </div>
                  </>
                  )}
                    <><p>Selected file</p><div className={classes.coverImageWrapper}>
            <img src={typeof postData.selectedFile=='Array'?URL.createObjectURL(postData?.selectedFile[0]):postData?.selectedFile}  className={classes.coverImage} loading='lazy' />
            <div
              className={classes.removeButton}
              onClick={async (e) => {
                e.preventDefault();
                if (postData?.selectedFile && typeof postData.selectedFile === 'string') {
                  const deleteImage = await deleteS3Image(post?._id, postData.selectedFile);
                }
                setPostData({ ...postData, selectedFile: '' });
              } }
            >
              <Typography variant="caption">x</Typography>
            </div>
          </div></>

                    

              <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type="submit" fullWidth>Submit</Button>
              <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>

          </div>


  );
}
export default PostForm