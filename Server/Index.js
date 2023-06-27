import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import postRoutes from './Routes/posts.js'
import userRoutes from './Routes/user.js'
import eventRoutes from './Routes/events.js'
import destinationRoutes from './Routes/destinations.js'
import commentRoutes from'./Routes/Comments.js'
import continentRoutes from './Routes/continents.js'
import countryRoutes from './Routes/countries.js'
import locationRoutes from './Routes/locations.js'



// import * as dotenv from 'dotenv' 
// dotenv.config()
const app = express();
const Port = process.env.port || 5000

app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Set the desired limit for the file size (e.g., 10MB)
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  url='http://localhost:3000'
 } else {
  url='https://journeybackend.onrender.com'
 }
const corsOptions = {
    origin: url,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/event', eventRoutes)
app.use('/destination',destinationRoutes)
app.use('/comment',commentRoutes)
app.use('/continent',continentRoutes)
app.use('/country',countryRoutes)
app.use('/location',locationRoutes)
app.get('/', (req, res) => { res.send('test works') })
app.set('port', Port);

mongoose.connect(process.env.CONNECTION_URL,  {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true})
    .then(app.listen(Port, () => console.log('server Running on Port :' + Port)))
    .catch((error) => console.log(error.message));

