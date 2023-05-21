import React ,{useEffect}from "react";
import {Pagination,PaginationItem} from '@material-ui/lab';
import useStyles from "./styles.js"
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDestinations } from "../../../actions/destinations.js";

const Paginate =({page})=>{
 console.log('rendered')
  const {numberOfPages}=useSelector((state)=>state.destinations)
  const classes=useStyles();
  const dispatch=useDispatch();
  useEffect(()=>{
    if(page) dispatch(getDestinations(page))
  },[page,dispatch])
  return(
    <Pagination 
    classes={{ul:classes.ul}}
    count={numberOfPages}
    page={Number(page)||1}
    variant="outlined"
    color='primary'
    renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/destinations?page=${item.page}`} />
  )}
    />
      );
};
export default Paginate;