import mongoose from "mongoose";
import Destination from "../Models/Destination.js"
import Comment from "../Models/Comment.js"
import s3 from '../awsConfig.js'
import { v4 as uuidv4 } from 'uuid';
export const  getTopDestinations= async(req,res) => {
    try {
        const destinations=await Destination.find().sort((a,b)=>(a.upvotes-a.downvotes)>(b.upvotes-b.downvotes)).limit(10);
      
        res.status(200).json({data:destinations})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const  getDestinations= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await Destination.countDocuments({});

        const destinations=await Destination.find().sort({_id:-1}).limit(Limit).skip(startIndex);
      
        res.status(200).json({data:destinations,currentPage:Number(page),NumberOfPages:Math.ceil(total/Limit)})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const  getDestination= async(req,res) => {
    const {id}=req.params;
    try {

        const destination=await Destination.findById(id);
      
        res.status(200).json(destination);
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const createDestination=async(req,res) => {
    const destinations = req.body;
    const files=req.files
//s3  
    // console.log('files',req.files)

    const uploadedFiles = [];
  
    for (let i = 0; i < files.images.length; i++) {
        
      const file = files.images[i];
    //   console.log('image stucture',file)
      const fileKey = uuidv4(); // Generate a unique file key or name
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey.toString(),
        Body: file.data ,
        // ACL: 'public-read',
      };
      try {
        const uploadResult = await s3.upload(uploadParams).promise();
        const fileUrl = uploadResult?.Location;
        // console.log('image upload',fileUrl)
        uploadedFiles.push(fileUrl);
      } catch (error) {
        console.log(error)
      }
    
    }
    const fileKey=uuidv4()
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey.toString(),
        Body: files.coverImage.data ,
        // ACL: 'public-read',
      };
      let uploadResult ;
      try{
       uploadResult = await s3.upload(uploadParams).promise();
     
      }
      catch(err){
        console.log(err)
      }
      const coverFileurl = uploadResult?.Location||'';
      destinations.images=uploadedFiles;
      destinations.coverImage=coverFileurl
      console.log('finale version',destinations)
    const newEDestination = new Destination({ ...destinations,createdAt:new Date() })
try {
     await newEDestination.save();
    res.status(201).json(newEDestination);
} catch (error) {
    res.status(401).json({message :error.message})
}
}

export const updateDestination=async (req,res)=>{
 const {id:_id}=req.params;
 const destination =req.body; 
 if(!mongoose.Types.ObjectId.isValid(_id)){
   return  res.status(404).send('No Posts with this Id');
 }
const updatedEvent= await Destination.findByIdAndUpdate(_id,destination,{new:true})
res.json(updatedEvent);
}

export const deleteDestination = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Destination.findByIdAndRemove(id);

    res.json({ message: "Destination Removed successfully." });
} 

export const upvoteDestination=async (req,res)=>{
    console.log(req.body,req.params)
    const { id }=req.params
    const userId=req.userId
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No destination with id: ${id}`);
    const destination =await Destination.findById(id)
    const index=destination.upvotes.findIndex((id)=> id ===String(userId));
    let updatedDestination=destination
    if(index===-1){
        destination.upvotes.push(userId)
        const downvoteIndex=destination.downvotes.findIndex((id)=> id ===String(userId));
        if(downvoteIndex!==-1){
            destination.downvotes.splice(downvoteIndex,1)
        }
    }
    updatedDestination= await Destination.findByIdAndUpdate(id,destination,{new: true});
    res.status(200).json(updatedDestination);

}
export const downvoteDestination=async (req,res)=>{
    const { id }=req.params
    const userId=req.userId
    console.log(req.userId)
    if(!userId) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No destination with id: ${id}`);
    const destination =await Destination.findById(id)
    const index=destination.downvotes.findIndex((id)=> id ===String(userId));
    let updatedDestination=destination;
    if(index===-1){
        destination.downvotes.push(userId)
        const upvoteIndex=destination.upvotes.findIndex((id)=> id ===String(userId));
        if(upvoteIndex!==-1){
            destination.upvotes.splice(upvoteIndex,1)
        }
         updatedDestination= await Destination.findByIdAndUpdate(id,destination,{new: true});
    }
    res.status(200).json(updatedDestination);
}

export const getDestinationComments=async (req,res)=>{
    const { id }=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No destination with id: ${id}`);
    const destinationComments= await Comment.find({destination:id}).exec() 
    if(destinationComments.length){
        res.status(200).json(destinationComments)
    }
    else{
        res.status(404).json({message:'No comments found'})
        }
}
export const commentDestination=async (req,res)=>{
    const { id }=req.params;
    const {content,userId}=req.body; 
    if(!userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No destination with id: ${id}`);  
    const createdComment=new Comment({destination:id,user:userId,content,createdAt:new Date()})
    try {
        await createdComment.save();
       res.status(201).json(createdComment);
   } catch (error) {
       res.status(401).json({message :error.message})
   }
}

export const getDestinationsBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query
    try {
        const title= new RegExp(searchQuery,'i');
        const destinations=await Event.find({$or:[{title},{tags:{$in:tags?.split(',')}}]})
        res.json({data:destinations});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
