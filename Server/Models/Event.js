import mongoose from "mongoose";

const eventSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    locations:[[String,String]],
    creator:{type:String,required:true},
    tags:[String],
    selectedFile:String,
    numberOfPlaces:{type:Number,required:true},
    eventFee:{type:String,required:true},
    discountRate:{type:String,required:true},
    attendants:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const Event=mongoose.model('Event',eventSchema);

export default Event;