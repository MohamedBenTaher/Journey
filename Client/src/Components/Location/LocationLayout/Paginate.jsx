import React ,{useEffect}from "react";
import {Pagination,PaginationItem} from '@material-ui/lab';
import useStyles from "./styles.js"
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getLocations } from "../../../actions/locations.js";
const Paginate =({page})=>{
  console.log('posts rd')
  const {numberOfPages}=useSelector((state)=>state.locations)
  const classes=useStyles();
  const dispatch=useDispatch();
  useEffect(()=>{
    if(page) dispatch(getLocations(page))
  },[page])
  return(
    <Pagination 
    classes={{ul:classes.ul}}
    count={numberOfPages}
    page={Number(page)||1}
    variant="outlined"
    color='primary'
    renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/locations?page=${item.page}`} />
  )}
    />
      );
};
export default Paginate;