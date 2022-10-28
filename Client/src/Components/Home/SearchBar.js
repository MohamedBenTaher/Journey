import React ,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid,Container,Grow, Paper,AppBar,TextField,Button, Typography } from '@material-ui/core'
import { getPosts ,getPostsBySearch } from '../../actions/posts.js'
import { useHistory,useLocation } from 'react-router-dom'
import ChipInput from "material-ui-chip-input";
import Posts from '../Posts/Posts.js'
import  Pagination from '../Pagination'
import useStyles from './styles.js'
function useQuery(){
    return new URLSearchParams(useLocation().search)
  }
function SearchBar() {
    const classes=useStyles();
    const [currentId,setCurrentId]=useState(0);
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
  
    const  query =useQuery(); 
    const history=useHistory()
    const dispatch =useDispatch();
    const page= query.get('page')||1;
    const searchQuery=query.get('searchQuery');
    const handleAdd=(tag)=>{
        setTags([...tags,tag]);
    }
    const handleDelete=(tagToDelete)=>{
      setTags(tags.filter((tag)=>tag!==tagToDelete));
    }
    const searchPost=()=>{
      if(search.trim() || tags){
        dispatch(getPostsBySearch({search,tags:tags.join(',')}));
        history.push(`/posts/search?searchQuery=${search ||'none'}&tags=${tags.join(',')}`);
      }
      else {
        history.push('/')
      }
    }

    const handleKeyPress=(e)=>{
       if(e.keyCode===13){
        searchPost();
       }
    }
  return (
    <Grow in>
    <Container maxWidth="xl" elevation={24}>
     <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                 <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId}/>
                </Grid> 
                <Grid item xs={12} sm={12} md={12}>
                  <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                    <Grid container   direction={{ xs: 'column', sm: 'column' ,md:'row',lg:'row'}} className={classes.search} spacing={2}>
                    <Grid item xs={12} md={4}>
                    <Typography>Destination</Typography>
                    <TextField name='search'
                    variant="outlined"
                    label="Search Destinations"
                    fullWidth
                    value={search}
                    onKeyPress={handleKeyPress}
                    onChange={(e)=>{setSearch(e.target.value)}}

                   
                    />
                    </Grid >
                    <Grid item xs={12} md={4}>
                    <Typography>Tags</Typography>
                    <ChipInput
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined"
                    fullWidth
                  
                />
                </Grid>
                <Grid item xs={12} md={4}>
                <Button onClick={searchPost} className={classes.searchButton} variant='contained' color="primary" fullWidth>Search</Button>
                </Grid>
                </Grid>
                  </AppBar>
                  </Grid>
                </Grid>
                </Container>
                </Grow>
  )
}

export default SearchBar