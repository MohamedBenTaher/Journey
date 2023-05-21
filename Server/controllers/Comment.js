import mongoose from "mongoose";
import Comment from "../Models/Comment.js"

export const getEntityComments=async (req,res)=>{
    try {
    const { id ,entityType}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ${entityType} with id: ${id}`);
    const entityComments= await Comment.find({entity:{entityId:id,type:entityType}}).exec() 
    if(entityComments?.length){
        res.status(200).json(entityComments)
    }
    else{
        res.status(404).json({message:'No comments found'})
        }
    } catch (error) {
        res.status(500).json({message:"something went wrong in the getEntityComments controller"})
    }
}
export const commentEntity=async (req,res)=>{
    try {
    const { id }=req.params;
    const {content,userId,entityName}=req.body;
    if(!userId ) return res.json({mesage:'Unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ${entityName} with id: ${id}`);
    const createdComment=new Comment({entity:{type:entityName,entityId:id},user:userId,content,createdAt:new Date()})
    try {
        await createdComment.save();
       res.status(201).json(createdComment);
   } catch (error) {
       res.status(401).json({message :error.message})
   }
    } catch (error) {
        console.log('error at commentEntity controller',error.message)
    }
}
export const updateCommentEntity=async (req,res)=>{
    try {
        const {id}=req.params
        const {content,userId,entityName}=req.body
        if(!userId ) return res.json({mesage:'Unauthenticated'})
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ${entityName} with id: ${id}`);
        const updatedComment= await Comment.findByIdAndUpdate(id,{content},{new: true});
        res.status(200).json(updatedDestination);
    } catch (error) {
        console.log(error)
    }
}
export const deleteCommentEntity=async(req,res)=>{
    try {
        const {id}=req.params
        const {entityName}=req.body
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ${entityName} with id: ${id}`);
        const deletedComment=await Comment.findByIdAndDelete(id);
        res.status(200).json(deletedComment);
        } catch (error) {
            console.log(error)
        }
}