import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
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
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
      },
    coverImage:{type:String,required:true},
    images:{type:[String],required:true},
    type:{
      type:String,
      enum:['restaurant','hotel','histrocal','natural']
    },
    avgRating: { type: [{id:String,rating:Number}], default: 0 },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
const Location = mongoose.model('Location', locationSchema);

export default Location;