import mongoose from "mongoose";
import PostMessage from "../Models/PostMessage.js"
export const  getPosts= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await PostMessage.countDocuments({});

        const posts=await PostMessage.find().sort({_id:-1}).limit(Limit).skip(startIndex);
      
        res.status(200).json({data:posts,currentPage:Number(page),NumberOfPages:Math.ceil(total/Limit)})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const  getPost= async(req,res) => {
    const {id}=req.params;
    try {

        const post=await PostMessage.findById(id);
      
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message :error.essage})
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
    console.log(post.likes)
    const index=post.likes.findIndex((id)=> id ===String(req.userId));
    if(index===-1){
        post.likes.push(req.userId)
    }else {
            post.likes=post?.likes?.fliter((id)=>id!==String(req.userId ))
    }

    const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new: true});
    res.json(updatedPost);

}
export const commentPost=async (req,res)=>{
    const { id }=req.params;
    const {value}=req.body; 
   
    const post =await PostMessage.findById(id);
    post.comments.push(value);

    const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new: true});
    res.json(updatedPost);

}

export const getPostsBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query
    try {
        const title= new RegExp(searchQuery,'i');
        const posts=await PostMessage.find({$or:[{title},{tags:{$in:tags?.split(',')}}]})
        res.json({data:posts});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}