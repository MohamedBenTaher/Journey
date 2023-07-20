import mongoose from "mongoose";
import Location from "../Models/Location.js"
import Comment from "../Models/Comment.js"
import s3 from '../awsConfig.js'
import { v4 as uuidv4 } from 'uuid';
import User from "../Models/user.js";



export const  getTopLocations= async(req,res) => {
    try {
        const locations=await Location.find().limit(10);
        res.status(200).json({data:locations})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const  getLocations= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await Location.countDocuments({});
        const locations=await Location.find().sort({_id:-1}).limit(Limit).skip(startIndex);
        res.status(200).json({data:locations,currentPage:Number(page),NumberOfPages:Math.ceil(total/Limit)})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const  getLocation= async(req,res) => {
    const {id}=req.params;
    try {
        const location=await Location.findById(id);
        res.status(200).json(location);
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}


export const  getLocationByCountry= async(req,res) => {
  const {id}=req.params;
  try {
      const locations = await Location.find({ country: id });
      res.status(200).json(locations);
  } catch (error) {
      res.status(404).json({message :error.essage})
  }
}


export const createLocation=async(req,res) => {
    const locations = req.body;
    const files=req.files
    const uploadedFiles = [];
    for (let i = 0; i < files.images.length; i++) {
      const file = files.images[i];
      const fileKey = uuidv4();
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey.toString(),
        Body: file.data ,
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
      }
      catch(err){
        console.log(err)
      }
      const coverFileurl = uploadResult?.Location||'';
      locations.images=uploadedFiles;
      locations.coverImage=coverFileurl
      console.log('finale version',locations)
    const newELocation = new Location({ ...locations,createdAt:new Date() })
try {
     await newELocation.save();
    res.status(201).json(newELocation);
} catch (error) {
    res.status(401).json({message :error.message})
}
}
export const bookmarkLocation = async (req, res) => {

  const { userId } = req.body;
  const id = req.params.id;
  try {
  const  resource = await Location.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.savedLocations.find((bookmark)=>bookmark==id)) {
      return res.status(400).json({ message: 'Resource already bookmarked' });
    }

    user.savedLocations.push(id);
    resource.bookmarkedBy.push(userId);
    await user.save();
    await resource.save();
    res.status(200).json({ message: 'Post bookmarked',resource});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' ,...error});
  }
};
export const cancelBookmarkLocation = async (req, res) => {
  const { userId } = req.body;
  const id = req.params.id;
  try {
    let resource;
    resource = await Location.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Location not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.savedLocations.includes(id)) {
      return res.status(400).json({ message: 'Location not bookmarked' });
    }
    user.savedLocations.pull(id);
    resource.bookmarkedBy.pull(userId);
    await user.save();
    await resource.save();
    res.status(200).json({ message: 'Bookmark canceled' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateLocation=async (req,res)=>{
 const {id}=req.params;
 const location =req.body; 
 const files=req.files
 if(!mongoose.Types.ObjectId.isValid(id)){
   return  res.status(404).send('No Posts with this Id');
 }
 const locationToUpdate=await Location.findById(id)
 if(!locationToUpdate){
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
    location.images=[...location.images,...uploadedFiles];
    location.coverImage=coverFileurl
    const updatedLocation= await Location.findByIdAndUpdate(id,location,{new:true})
    res.json(updatedLocation);
    }


export const deleteLocation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const locationToDelete=await Location.findById(id);
    for(el in locationToDelete.images){
        const key= locationToDelete.images[el].split('/').pop();
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

    const coverImageKey=locationToDelete.coverImage.split('/').pop()
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
    const destiationDeleted= await Location.findByIdAndRemove(id)
    res.status(200).json({ message: destiationDeleted });
}
export const rateLocation = async (req, res) => {
    const {id}=req.params;
    const { userId, rating } = req.body;
    try {
      const location = await Location.findById(id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      const ratingIndex = location.avgRating.findIndex((r) => r.id === userId);
      if (ratingIndex !== -1) {
        location.avgRating[ratingIndex].rating = rating;
      } else {
        location.avgRating.push({ id: userId, rating });
      }
      const updatedLocation = await location.save();
      return res.status(200).json({ message: 'Location rating updated successfully', location: updatedLocation });
    } catch (error) {
      console.error('Error rating location:', error);
      return res.status(500).json({ message: 'An error occurred while rating the location' });
    }
  };

export const getLocationsBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query
    try {
        const title= new RegExp(searchQuery,'i');
        const locations=await Event.find({$or:[{title},{tags:{$in:tags?.split(',')}}]})
        res.json({data:locations});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const deleteS3Image=async(req,res)=>{
    const {id}=req.params
    const {url}=req.body
    const key = url.split('/').pop();
    console.log('image url',url,key)
    const location =await Location.findById(id)
        if(location.coverImage!==url && location.images.indexOf(url)===-1){
             return res.status(400).json({message:'Image not found'})
    }
    else if(location.coverImage==url){
        location.coverImage=''
    }
    else if(location.images.indexOf(url)!==-1){
            location.images.splice(location.images.indexOf(url),1)
            console.log('images left',location.images)
    }
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('Error deleting image from S3:', err);
      } else {
        console.log('Image deleted from S3:', data);
      }
    });
    await Location.findByIdAndUpdate(id,location,{new: true});
    res.status(200).json(location)
}


export const getLocationByDestination = async (req, res) => {
    const { destinationId } = req.params;
    try {
      const locations = await Location.find({ destination: destinationId });
      return res.status(200).json({ locations });
    } catch (error) {
      console.error('Error getting locations by destination:', error);
      return res.status(500).json({ message: 'An error occurred while retrieving locations by destination' });
    }
};