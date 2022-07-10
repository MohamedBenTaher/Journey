import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './Routes/posts.js'
import userRoutes from './Routes/user.js'
import * as dotenv from 'dotenv' 
dotenv.config()
const app =express();
const PORT = process.env.PORT;


app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes)
app.get('/',(req,res)=>res.send('yess'))

const CONNECTION_URL=process.env.CONNECTION_URL
const Port=process.env.port||5000 
console.log(PORT)
mongoose.connect(CONNECTION_URL)
    .then(app.listen(PORT,()=>console.log('server Running on Port :'+PORT)))
     .catch((error)=>console.log(error.message));

