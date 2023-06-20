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
    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Destination',
        required: false,
      },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Country',
        required: false,
      },
    tags:[String],
    selectedFile:String,
    cost:{
      type:Number,
      required:false,
      default:0
    },
    duration:{
      type:Number,
      required:true,
      default:0
    },
    comments:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    bookmarkedBy:{
      type: [{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
        }],
      default: []
  },
    likedBy: {
      type: [{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
        }],
      default: []
  },

});
const PostMessage=mongoose.model('PostMessage',postSchema);

export default PostMessage;