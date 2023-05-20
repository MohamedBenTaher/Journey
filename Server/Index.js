import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './Routes/posts.js'
import userRoutes from './Routes/user.js'
import eventRoutes from './Routes/events.js'
import destinationRoutes from './Routes/destinations.js'
import fileUpload from 'express-fileupload';
// import * as dotenv from 'dotenv' 
// dotenv.config()
const app = express();
const Port = process.env.port || 5000

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/event', eventRoutes)
app.use('/destination',destinationRoutes)
app.get('/', (req, res) => { res.send('test works') })
app.set('port', Port);

mongoose.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true ,useFindAndModify:false})
    .then(app.listen(Port, () => console.log('server Running on Port :' + Port)))
    .catch((error) => console.log(error.message));

