import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Models/user.js"
export const signin= async(req,res)=>{

  const {email,password}=req.body;
  try {
      const existingUser=await User.findOne({email});
      if (!existingUser) return res.status(404).json({message:"User Unfound"})
      const isPasswordCorrect= await bcrypt.compare(password,existingUser.password)
      if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"})
      const token =jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"} )
      res.status(200).json({result:existingUser,token:token})
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong !"})
  }
}
export const signup= async(req,res)=>{
    try {
        const {email,password,firstName,lastName,confirmPassword}=req.body;
        const existingUser=await User.findOne({email});
        if (existingUser) return res.status(400).json({message:"User Already Exists"})
       console.log(password,confirmPassword); 
        if(password !== confirmPassword)
        { return res.status(400).json({message:"Passwords Dont match"})
      }
        const hashedPassword =await bcrypt.hash(password,12)  ;
        const result =await User.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token =jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"} )
        res.status(200).json({result,token})
    } catch (error) {
        return res.status(500).json({message:"Something Went Wrong !"})

    }
   






}