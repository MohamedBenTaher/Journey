import mongoose from "mongoose";

const destinationSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    country: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Country',
        required: true,
      },
    type: {type:String,Enumerator:['Location','city','country']},
    creator: { type: String, required: true },
    coverImage:{type:String,required:true},
    images:{type:[String],required:true},
    upvotes:{type:[String],default:[]},
    downvotes:{type:[String],default:[]},
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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