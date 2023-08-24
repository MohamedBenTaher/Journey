import mongoose from "mongoose";
import Comment from "../Models/Comment.js"

export const getEntityComments = async (req, res) => {
    try {
      const { id } = req.params;
      const entityType = req.query.entityType;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No ${entityType} with id: ${id}`);
      }
      const entityComments = await Comment.find({ entity: {type: entityType , entityId: mongoose.Types.ObjectId(id) } }).
      populate("user")
      .exec();
      if (entityComments.length > 0) {
        res.status(200).json(entityComments);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving entity comments" });
    }
  };
export const commentEntity=async (req,res)=>{
    try {
    const { id }=req.params;
    const {userId,entityType,content}=req.body.body
    if(!mongoose.Types.ObjectId.isValid(req.userId))return res.json({mesage:'Unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ${entityType} with id: ${id}`);
    const createdComment=new Comment({entity:{type:entityType,entityId:id},user:userId,content:content,createdAt:new Date()})
    try {
        await createdComment.save();
        await createdComment.populate('user').execPopulate();
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
        const {content,userId}=req.body
        if(!userId ) return res.json({mesage:'Unauthenticated'})
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Object with id: ${id}`);
        const comment =await Comment.findById(id)
        comment.content=content;
        const updatedComment= await Comment.findByIdAndUpdate(id,comment,{new: true});
        updatedComment.populate('user').execPopulate();
        res.status(200).json(updatedComment);
    } catch (error) {
        console.log(error)
    }
}
export const deleteCommentEntity=async(req,res)=>{
    try {
        const {id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Object with id: ${id}`);
        const deletedComment=await Comment.findByIdAndDelete(id);
        res.status(200).json(deletedComment);
        } catch (error) {
            console.log(error)
        }
}