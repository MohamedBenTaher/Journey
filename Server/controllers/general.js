import savedResources from "../Models/savedResources.js";
import User from "../Models/user.js";
import mongoose from "mongoose";
import PostMessage from "../Models/PostMessage.js";

export const bookmarkResource=async (req,res)=>{
    const  userId =req.params.id
    const {id,resourceName}=req.body
    let savedResource;
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No resource with id: ${id}`);
    const resource=await savedResources.find({user:userId})
    const userIndex=resource?.resources?.findIndex((res)=> res.resourceId===String(id));
    if(userIndex===-1){
        resource?.resources?.push({type:resourceName,resourceId:id})
        if(resourceName==='PostMessage'){
            const postMessage=await PostMessage.findById(id)
            postMessage.bookamrks.push(userId)
            savedResource=await PostMessage.findByIdAndUpdate(id,postMessage,{new:true})
        }
    }
    const updatedResource=await savedResources.findByIdAndUpdate(resource._id,updatedResource,{new:true})
    res.status(200).json(updatedResource,savedResource);
}
export const cancelBookmarkResource=async (req,res)=>{
    const { userId }=req.params
    const {id,resourceName}=req.body
    let savedResource;
    console.log(userId,id,resourceName)
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No resource with id: ${id}`);
    const resource=await savedResources.find({user:userId})
    const userIndex=resource?.resources?.findIndex((res)=> res.resourceId===String(id))
    if(userIndex!==-1){
        resource?.resources=resource?.resources?.fliter((res)=>res.resourceId!==String(id))
        if(resourceName==='PostMessage'){
            const postMessage=await PostMessage.findById(id)
            postMessage.bookamrks.filter((id)=>id===userId)
            savedResource=await PostMessage.findByIdAndUpdate(id,postMessage,{new:true})
        }
    }
    const updatedResource=await savedResources.findByIdAndUpdate(resource._id,resource,{new:true})
    res.status(200).json(updatedResource);
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
    res.status(200).json(updatedUser);
}
