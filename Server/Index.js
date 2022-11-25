import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './Routes/posts.js'
import userRoutes from './Routes/user.js'
import eventRoutes from './Routes/events.js'
// import * as dotenv from 'dotenv' 
// dotenv.config()
const app = express();
const Port = process.env.port || 5000


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/events', eventRoutes)
app.get('/', (req, res) => { res.send('yess') })
app.set('port', Port);
const CONNECTION_URL = "mongodb+srv://Medben:medben45@memories.urmfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(app.listen(Port, () => console.log('server Running on Port :' + Port)))
    .catch((error) => console.log(error.message));

