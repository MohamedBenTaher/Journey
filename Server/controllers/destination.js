import mongoose from "mongoose";
import Destination from "../Models/Destination.js"
import Comment from "../Models/Comment.js"
import s3 from '../awsConfig.js'
import { v4 as uuidv4 } from 'uuid';
import User from "../Models/user.js";



export const getTopDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().limit(6).populate("country");
    res.status(200).json({ data: destinations });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const likeDestination = async (req, res) => {
  const { id } = req.params;
  const {userId} = req.body;
  try {
    let resource;
    resource = await Destination.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user?.likes?.includes(id)) {
      user?.likedCities?.filter((id)=>id==id);
      resource.likedBy?.filter((id)=>id==userId)
      res.status(200).json({ message: 'Location Unliked' });
    }
    user?.likedCities.push(id);
    resource.likedBy.push(userId);
    await user.save();
    await resource.save();
    res.status(200).json({ message: 'Resource liked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const  getDestinations= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await Destination.countDocuments({});

        const destinations=await Destination.find().sort({_id:-1}).limit(Limit).skip(startIndex);
      
        res.status(200).json({data:destinations,currentPage:Number(page),numberOfPages:Math.ceil(total/Limit)})
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
export const  getDestinationByCountry= async(req,res) => {
  const {id}=req.params;
  try {

      const destinations = await Destination.find({ country: id });
    
      res.status(200).json(destinations);
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
        ContentType: 'image/jpeg', 
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
        ContentType: 'image/jpeg', 
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
 const {id}=req.params;
 const destination =req.body; 
 const files=req.files
 if(!mongoose.Types.ObjectId.isValid(id)){
   return  res.status(404).send('No Posts with this Id');
 }
 const destinationToUpdate=await Destination.findById(id)
 if(!destinationToUpdate){
    return res.status(404).json({message:'No Posts with this Id'})
    }
const uploadedFiles = [];
  if(files.images){
    for (let i = 0; i < files?.images?.length; i++) {
        
      const file = files.images[i];
      const fileKey = uuidv4();
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey.toString(),
        Body: file?.data ,
        ContentType: 'image/jpeg',
      };
      try {
        const uploadResult = await s3.upload(uploadParams).promise();
        const fileUrl = uploadResult?.Location;
        uploadedFiles.push(fileUrl);
      } catch (error) {
        console.log(error)
      }
    
    }
}
    let coverFileurl
    if(files.coverImage){
        const fileKey=uuidv4()
        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey.toString(),
            Body: files.coverImage.data ,
            ContentType: 'image/jpeg', 
          };
          let uploadResult ;
          try{
           uploadResult = await s3.upload(uploadParams).promise();
           coverFileurl = uploadResult?.Location||'';
          }
          catch(err){
            console.log(err)
          }
    }
    destination.images=[...destination.images,...uploadedFiles];
    destination.coverImage=coverFileurl
    const updatedDestination= await Destination.findByIdAndUpdate(id,destination,{new:true})
    res.json(updatedDestination);
    }

    export const bookmarkDestination = async (req, res) => {
      const { userId } = req.body;
      const id = req.params.id;
      try {
      const  resource = await Destination.findById(id);
        if (!resource) {
          return res.status(404).json({ message: 'City not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
     
        if (user.savedStories.includes(id)) {
          return res.status(400).json({ message: 'Resource already bookmarked' });
        }
        user.savedCities.push(id);
        resource.bookmarkedBy.push(userId);
        await user.save();
        await resource.save();
        res.status(201).json({ message: 'City bookmarked', resource});
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' ,...error});
      }
    };
    export const cancelBookmarkDestination = async (req, res) => {
      const { userId } = req.body;
      const resourceId = req.params.id;
      try {
        let resource;
        resource = await Destination.findById(resourceId);
        if (!resource) {
          return res.status(404).json({ message: 'City not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (!user.savedCities.includes(resourceId)) {
          return res.status(400).json({ message: 'City not bookmarked' });
        }
        user.savedCities.pull(resourceId);
        resource.bookmarkedBy.pull(userId);
        await user.save();
        await resource.save();
        res.status(200).json({ message: 'Bookmark canceled' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
export const deleteDestination = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const destinationToDelete=await Destination.findById(id);
    for(el in destinationToDelete.images){
        const key= destinationToDelete.images[el].split('/').pop();
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key:key
            };
        try{
            await s3.deleteObject(params).promise();
            }
            catch(err){
            console.log(err)
            }
    }

    const coverImageKey=destinationToDelete.coverImage.split('/').pop()
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
    
    const destiationDeleted= await Destination.findByIdAndRemove(id)
    res.status(200).json({ message: destiationDeleted });
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

export const deleteS3Image=async(req,res)=>{
    const {id}=req.params
    const {url}=req.body
    const key = url.split('/').pop();
    console.log('image url',url,key)
    const destination =await Destination.findById(id)
        if(destination.coverImage!==url && destination.images.indexOf(url)===-1){
             return res.status(400).json({message:'Image not found'})
    }
    else if(destination.coverImage==url){
        destination.coverImage=''
    }
       
        else if(destination.images.indexOf(url)!==-1){
            destination.images.splice(destination.images.indexOf(url),1)
            console.log('images left',destination.images)
    }
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };
  
    // Delete the image from S3
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('Error deleting image from S3:', err);
      } else {
        console.log('Image deleted from S3:', data);
      }
    });
    await Destination.findByIdAndUpdate(id,destination,{new: true});
    res.status(200).json(destination)
}
