import React ,{useEffect}from "react";
import {Pagination,PaginationItem} from '@material-ui/lab';
import useStyles from "./styles.js"
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getPosts } from "../actions/posts.js";
const Paginate =({page})=>{
  const {numberOfPages}=useSelector((state)=>state.posts)
  const classes=useStyles();
  const dispatch=useDispatch();
  useEffect(()=>{
    if(page) dispatch(getPosts(page))
  },[page])
  return(
    <Pagination 
    style={{backgroundColor:'transparent'}}
    classes={{ul:classes.ul,backgroundColor:'red'}}
    count={numberOfPages}
    page={Number(page)||1}
    variant="outlined"
    color='primary'
    renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
  )}
    />
      );
};
export default Paginate;