import React ,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid,Container,Grow, Paper,AppBar,TextField,Button } from '@material-ui/core'
import { useHistory,useLocation } from 'react-router-dom'
import Form from '../Form/Form.js'
import ChipInput from "material-ui-chip-input";
import Posts from '../Posts/Posts.js'
import { getPosts ,getPostsBySearch } from '../../actions/posts.js'
import  Pagination from '../Pagination'
import useStyles from './styles.js'
function useQuery(){
  return new URLSearchParams(useLocation().search)
}
const Home = () => {
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
    <Container maxWidth="xl">
     <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={12}>
                  <Posts setCurrentId={setCurrentId}/>
                  {(!searchQuery && !tags.length) && (<Grid>
                    <Pagination page={page} />
                  </Grid>)}
                </Grid>
                
                <Grid item >
                  <Form  currentId={currentId} setCurrentId={setCurrentId} />
                
                </Grid>

     </Grid>
     </Container>
  </Grow>
  )
}

export default Home