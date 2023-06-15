import Country from "../Models/Country";
import Destination from "../Models/Destination";
import Event from "../Models/Event";
import Location from "../Models/Location";
import PostMessage from "../Models/PostMessage";
import User from "../Models/user";


export const bookmarkResource=async (req,res)=>{
    const { id }=req.params
    const {resourceName}=req.body
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const user=await User.findById(req.userId)
    const userIndex=user.likedResources.findIndex((res)=> res.id===String(req.userId));
    if(userIndex===-1){
        user.likedResources.push({type:resourceName,id})
    }else {
        user.likedResources=user?.likedResources?.fliter((res)=>res.id!==String(req.userId ))
    }
    const updatedUser=await User.findByIdAndUpdate(req.userId,user,{new:true})
    res.status(200).json(updatedPost,updatedUser);
}
export const likeResource=async (req,res)=>{
    const { id }=req.params;
    const {resourceName}=req.body
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const user=await User.findById(req.userId)
    const userIndex=user.likedResources.findIndex((res)=> res.id===String(req.userId));
    if(userIndex===-1){
        user.likedResources.push({type:resourceName,id})
    }else {
        user.likedResources=user?.likedResources?.fliter((res)=>res.id!==String(req.userId ))
    }
    const updatedUser=await User.findByIdAndUpdate(req.userId,user,{new:true})
    res.status(200).json(updatedPost,updatedUser);
}
