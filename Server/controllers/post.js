import mongoose from "mongoose";
import s3 from '../awsConfig.js'
import { v4 as uuidv4 } from 'uuid';
import User from "../Models/user.js";
import PostMessage from "../Models/PostMessage.js";
import Comment from '../Models/Comment.js'; 
import { getUserTypeById } from "../utils/helpers.js";
export const getTopPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find()
      .populate('creator')
      .sort({ likes: -1 })
      .limit(2)
      .exec();
    console.log('post',posts)
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({
          entity: { type: 'PostMessage', entityId: post._id },
        }).populate('user'); 
        return { ...post.toObject(), comments };
      })
    );

    res.json(postsWithComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const  getPosts= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await PostMessage.countDocuments({});
        const posts=await PostMessage.find().sort({_id:-1}).limit(Limit).skip(startIndex);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/Limit)})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const  getPost= async(req,res) => {
    const {id}=req.params;
    try {

        const post=await PostMessage.findById(id).populate('creator').populate('country').populate('destination');
        console.log('post',post)
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}

export const createPost=async(req,res) => {
    const post = req.body;
    const files=req.files;
    console.log('req',req,'files',files)
    const fileKey=uuidv4()
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey.toString(),
        Body: files.image.data ,
        ContentType: 'image/jpeg', 
      };
      let uploadResult ;
      try{
       uploadResult = await s3.upload(uploadParams).promise();
      }
      catch(err){
        console.log(err)
      }
    const Fileurl = uploadResult?.Location||'';
    post.selectedFile=Fileurl;
    post.creator=mongoose.Types.ObjectId(post?.creator)
    const newPostMessage = new PostMessage({ ...post,createdAt:new Date().toISOString() })
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
 const files=req.files;
    console.log('req',req,'files',files)
    if(files){
    const fileKey=uuidv4()
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey.toString(),
        Body: files.image.data ,
        ContentType: 'image/jpeg', 
      };
      let uploadResult ;
      try{
       uploadResult = await s3.upload(uploadParams).promise();
      }
      catch(err){
        console.log(err)
      }
    const Fileurl = uploadResult?.Location||'';
    post.selectedFile=Fileurl;}
 if(!mongoose.Types.ObjectId.isValid(_id)){
   return  res.status(404).send('No Posts with this Id');
 }
const UpdatedPost= await PostMessage.findByIdAndUpdate(_id,post,{new:true})
res.json(UpdatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const postToDelete=await PostMessage.findById(id)
    console.log('found post to Delete',postToDelete)
    if(postToDelete['selectedFile']){
    const coverImageKey=postToDelete.selectedFile.split('/').pop()
    const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key:coverImageKey
    };
    try{
        await s3.deleteObject(params).promise();
        }
        catch(err){
            console.log(err)
        }
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
} 


export const bookmarkPost = async (req, res) => {
    const { userId } = req.body;
    const id = req.params.id;
    try {
    const  resource = await PostMessage.findById(id);
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
       const user = await getUserTypeById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.userType !== 'Customer') {
            return res.status(403).json({ message: 'Only customers can like posts' });
        }

      if (user.savedStories.includes(id)) {
        return res.status(400).json({ message: 'Resource already bookmarked' });
      }

      user.savedStories.push(id);
      resource.bookmarkedBy.push(userId);
      await user.save();
      await resource.save();
      res.status(200).json({ message: 'Post bookmarked', resource});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' ,...error});
    }
  };
  export const cancelBookmarkPost = async (req, res) => {
    const { userId } = req.body;
    const id = req.params.id;
    try {
      let resource;
      resource = await PostMessage.findById(id);
      if (!resource) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const user = await getUserTypeById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.userType !== 'Customer') {
            return res.status(403).json({ message: 'Only customers can like posts' });
        }
      if (!user.savedStories.includes(id)) {
        return res.status(400).json({ message: 'Post not bookmarked' });
      }
      user.savedStories.pull(id);
      resource.bookmarkedBy.pull(userId);
      await user.save();
      await resource.save();
      res.status(200).json({ message: 'Bookmark canceled' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  export const likePost = async (req, res) => {
    const { userId } = req.body;
    const id = req.params.id;
    try {
      let resource;
      resource = await PostMessage.findById(id);
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      const user = await getUserTypeById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.userType !== 'Customer') {
            return res.status(403).json({ message: 'Only customers can like posts' });
        }
      if (user.likedStories.includes(id)) {

        user.likedStories.filter((id)=>id==id);
        resource.likedBy.filter((id)=>id==userId)
        res.status(200).json({ message: 'Resource Unliked' });
      }
      user.likedStories.push(id);
      resource.likedBy.push(userId);
      await user.save();
      await resource.save();
      res.status(200).json({ message: 'Resource liked' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

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
export const getPostsByCreator=async (req,res)=>{
    const {name} =req.params;
    try {
        const posts=await PostMessage.find({name})

        res.json({data:posts})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}