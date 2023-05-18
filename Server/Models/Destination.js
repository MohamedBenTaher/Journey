import mongoose from "mongoose";

const destinationSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    country :{type:String,required:true},
    type: {type:String,Enumerator:['Location','city','country']},
    creator: { type: String, required: true },
    coverImage:{type:String,required:true},
    images:{type:[String],required:true},
    upvotes:{type:[String],default:[]},
    downvotes:{type:[String],default:[]},
    comments: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
});
const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;