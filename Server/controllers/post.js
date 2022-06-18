import mongoose from "mongoose";
import PostMessage from "../Models/PostMessage.js"
export const  getPosts= async(req,res) => {
    try {
        const postMessages=await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message :message.error})
    }
}
export const createPost=async(req,res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator:req.userId,createdAt:new Date().toISOString() })
try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage );
} catch (error) {
    res.status(401).json({message :error.message})
}
}

export const updatePost=async (req,res)=>{
 const {id:_id}=req.params;
 const post =req.body; 
 if(!mongoose.Types.ObjectId.isValid(_id)){
   return  res.status(404).send('No Posts with this Id');
 }
const UpdatedPost= await PostMessage.findByIdAndUpdate(_id,post,{new:true})
res.json(UpdatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
} 

export const likePost=async (req,res)=>{
    const { id }=req.params
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
   
    const post =await PostMessage.findById(id)
    const index=post.likes.findIndex((id)=> id ===String(req.userId));
    if(index===-1){
        post.likes.push(req.userId)
    }else {
            post.likes=post.likes.fliter((id)=>id!==String(req.userId ))
    }

    const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new: true});
    res.json(updatedPost);

}