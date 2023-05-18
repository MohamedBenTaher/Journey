import mongoose from "mongoose";
import Destination from "../Models/Destination.js"
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

    console.log(destinations)
    const uploadedFiles = [];
  
    for (let i = 0; i < files.images; i++) {
      const file = files.images[i];
      const fileKey = uuidv4(); // Generate a unique file key or name
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: file ,
        ACL: 'public-read',
      };

      const uploadResult = await s3.upload(uploadParams).promise();
      const fileUrl = uploadResult.Location;
      console.log('image upload',fileUrl)
      uploadedFiles.push(fileUrl);
    }
    const fileKey=uuidv4
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: files.coverImage ,
        ACL: 'public-read',
      };
      const uploadResult = await s3.upload(uploadParams).promise();
      const coverFileurl = uploadResult.Location;
      destinations.images=uploadedFiles;
      destinations.coverFileurl=coverFileurl
      console.log(destinations)
    const newEDestination = new Destination({ ...destinations,createdAt:Date.now })
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
    const { id }=req.params
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No destination with id: ${id}`);
   
    const destination =await destination.findById(id)
    const index=destination.upvotes.findIndex((id)=> id ===String(req.userId));
    if(index===-1){
        destination.upvotes.push(req.userId)
    }else {
        destination.attendants=destination?.upvotes?.fliter((id)=>id!==String(req.userId ))
    }

    const updatedDestination= await destination.findByIdAndUpdate(id,destination,{new: true});
    res.status(200).json(updatedDestination);

}
export const downvoteDestination=async (req,res)=>{
    const { id }=req.params
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No destination with id: ${id}`);
   
    const destination =await destination.findById(id)
    const index=destination.downvotes.findIndex((id)=> id ===String(req.userId));
    if(index===-1){
        destination.downvotes.push(req.userId)
    }else {
        destination.attendants=destination?.downvotes?.fliter((id)=>id!==String(req.userId ))
    }

    const updatedDestination= await destination.findByIdAndUpdate(id,destination,{new: true});
    res.status(200).json(updatedDestination);

}
export const commentDestination=async (req,res)=>{
    const { id }=req.params;
    const {value}=req.body; 
   
    const destination =await Destination.findById(id);
    destination.comments.push(value);

    const updatedDestination= await Destination.findByIdAndUpdate(id,destination,{new: true});
    res.json(updatedDestination);

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
