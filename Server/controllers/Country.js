import mongoose from "mongoose";
import Country from "../Models/Country.js"
import s3 from '../awsConfig.js'
import { v4 as uuidv4 } from 'uuid';


export const  getTopCountrys= async(req,res) => {
    try {
        const countrys=await Country.find().sort((a,b)=>(a.upvotes-a.downvotes)>(b.upvotes-b.downvotes)).limit(10);
        res.status(200).json({data:countrys})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}


export const  getCountrys= async(req,res) => {
    const {page}=req.query;
    try {
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        const total=await Country.countDocuments({});
        const countries=await Country.find().sort({_id:-1}).limit(Limit).skip(startIndex);
        res.status(200).json({data:countries,currentPage:Number(page),NumberOfPages:Math.ceil(total/Limit)})
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}


export const  getCountry= async(req,res) => {
    const {id}=req.params;
    try {
        const country=await Country.findById(id);
        res.status(200).json(country);
    } catch (error) {
        res.status(404).json({message :error.essage})
    }
}
export const createCountry=async(req,res) => {
    const countries = req.body;
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
      countries.images=uploadedFiles;
      countries.coverImage=coverFileurl
      console.log('finale version',countries)
    const newECountry = new Country({ ...countries,createdAt:new Date() })
try {
     await newECountry.save();
    res.status(201).json(newECountry);
} catch (error) {
    res.status(401).json({message :error.message})
}
}

export const updateCountry=async (req,res)=>{
 const {id}=req.params;
 const country =req.body; 
 const files=req.files
 if(!mongoose.Types.ObjectId.isValid(id)){
   return  res.status(404).send('No Posts with this Id');
 }
 const countryToUpdate=await Country.findById(id)
 if(!countryToUpdate){
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
    country.images=[...country.images,...uploadedFiles];
    country.coverImage=coverFileurl
    const updatedCountry= await Country.findByIdAndUpdate(id,country,{new:true})
    res.json(updatedCountry);
    }


export const deleteCountry = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const countryToDelete=await Country.findById(id);
    for(el in countryToDelete.images){
        const key= countryToDelete.images[el].split('/').pop();
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

    const coverImageKey=countryToDelete.coverImage.split('/').pop()
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
    
    const destiationDeleted= await Country.findByIdAndRemove(id)
    res.status(200).json({ message: destiationDeleted });
} 

export const upvoteCountry=async (req,res)=>{
    console.log(req.body,req.params)
    const { id }=req.params
    const userId=req.userId
    if(!req.userId ) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No country with id: ${id}`);
    const country =await Country.findById(id)
    const index=country.upvotes.findIndex((id)=> id ===String(userId));
    let updatedCountry=country
    if(index===-1){
        country.upvotes.push(userId)
        const downvoteIndex=country.downvotes.findIndex((id)=> id ===String(userId));
        if(downvoteIndex!==-1){
            country.downvotes.splice(downvoteIndex,1)
        }
    }

    updatedCountry= await Country.findByIdAndUpdate(id,country,{new: true});
    res.status(200).json(updatedCountry);

}
export const downvoteCountry=async (req,res)=>{
    const { id }=req.params
    const userId=req.userId
    console.log(req.userId)
    if(!userId) return res.json({mesage:'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No country with id: ${id}`);
    const country =await Country.findById(id)
    const index=country.downvotes.findIndex((id)=> id ===String(userId));
    let updatedCountry=country;
    if(index===-1){
        country.downvotes.push(userId)
        const upvoteIndex=country.upvotes.findIndex((id)=> id ===String(userId));
        if(upvoteIndex!==-1){
            country.upvotes.splice(upvoteIndex,1)
        }
         updatedCountry= await Country.findByIdAndUpdate(id,country,{new: true});
    }
    res.status(200).json(updatedCountry);
}



export const getCountrysBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query
    try {
        const title= new RegExp(searchQuery,'i');
        const countries=await Event.find({$or:[{title},{tags:{$in:tags?.split(',')}}]})
        res.json({data:countries});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const deleteS3Image=async(req,res)=>{
    const {id}=req.params
    const {url}=req.body
    const key = url.split('/').pop();
    console.log('image url',url,key)
    const country =await Country.findById(id)
        if(country.coverImage!==url && country.images.indexOf(url)===-1){
             return res.status(400).json({message:'Image not found'})
    }
    else if(country.coverImage==url){
        country.coverImage=''
    }
        else if(country.images.indexOf(url)!==-1){
            country.images.splice(country.images.indexOf(url),1)
            console.log('images left',country.images)
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
    await Country.findByIdAndUpdate(id,country,{new: true});
    res.status(200).json(country)
}
