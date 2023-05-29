import mongoose from "mongoose";
import s3 from '../awsConfig.js'
import { v4 as uuidv4 } from 'uuid';
import Continent from "../Models/Continent.js";


export const  getTopContinents= async(req,res) => {
    try {
        const continents=await Continent.find().sort((a,b)=>a.likes-b.likes).limit(10);
        res.status(200).json({data:continents})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}


export const  getContinents= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await Continent.countDocuments({});
        const continents=await Continent.find().sort({_id:-1}).limit(Limit).skip(startIndex);
        res.status(200).json({data:continents,currentPage:Number(page),NumberOfPages:Math.ceil(total/Limit)})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}


export const  getContinent= async(req,res) => {
    const {id}=req.params;
    try {
        const continent=await Continent.findById(id);
        res.status(200).json(continent);
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}


export const createContinent=async(req,res) => {
    const continent = req.body;
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
      continent.images=uploadedFiles;
      continent.coverImage=coverFileurl

    const newContinent = new Continent({ ...continent,createdAt:new Date() })
try {
     await newContinent.save();
    res.status(201).json(newContinent);
} catch (error) {
    res.status(401).json({message :error.message})
}}

export const updateContinent=async (req,res)=>{
 const {id}=req.params;
 const continent =req.body; 
 const files=req.files
 if(!mongoose.Types.ObjectId.isValid(id)){
   return  res.status(404).send('No Posts with this Id');
 }
 const continentToUpdate=await Continent.findById(id)
 if(!continentToUpdate){
    return res.status(404).json({message:'No Continent with this Id'})
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
    continent.images=[...continent.images,...uploadedFiles];
    continent.coverImage=coverFileurl
    const updatedCountry= await Country.findByIdAndUpdate(id,continent,{new:true})
    res.json(updatedCountry);
    }


export const deleteContinents = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const continentToDelete=await Continent.findById(id);
    for(el in continentToDelete.images){
        const key= continentToDelete.images[el].split('/').pop();
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

    const coverImageKey=continentToDelete.coverImage.split('/').pop()
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
    
    const continentDeleted= await Continent.findByIdAndRemove(id)
    res.status(200).json({ message: continentDeleted });
} 




// export const downvoteCountry=async (req,res)=>{
//     const { id }=req.params
//     const userId=req.userId
//     console.log(req.userId)
//     if(!userId) return res.json({mesage:'Unauthenticated'})
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No country with id: ${id}`);
//     const country =await Country.findById(id)
//     const index=country.downvotes.findIndex((id)=> id ===String(userId));
//     let updatedCountry=country;
//     if(index===-1){
//         country.downvotes.push(userId)
//         const upvoteIndex=country.upvotes.findIndex((id)=> id ===String(userId));
//         if(upvoteIndex!==-1){
//             country.upvotes.splice(upvoteIndex,1)
//         }
//          updatedCountry= await Continent.findByIdAndUpdate(id,country,{new: true});
//     }
//     res.status(200).json(updatedCountry);
// }



export const getContinentsBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query
    try {
        const title= new RegExp(searchQuery,'i');
        const continents=await Continent.find({$or:[{title},{tags:{$in:tags?.split(',')}}]})
        res.json({data:continents});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const deleteS3Image=async(req,res)=>{
    const {id}=req.params
    const {url}=req.body
    const key = url.split('/').pop();
    console.log('image url',url,key)
    const continent =await Continent.findById(id)
        if(continent.coverImage!==url && continent.images.indexOf(url)===-1){
             return res.status(400).json({message:'Image not found'})
    }
    else if(continent.coverImage==url){
        continent.coverImage=''
    }
        else if(continent.images.indexOf(url)!==-1){
            continent.images.splice(continent.images.indexOf(url),1)
            console.log('images left',continent.images)
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
    await Continent.findByIdAndUpdate(id,continent,{new: true});
    res.status(200).json(continent)
}
