import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
      },
    tags:[String],
    selectedFile:String,
    likes:{
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
const PostMessage=mongoose.model('PostMessage',postSchema);

export default PostMessage;