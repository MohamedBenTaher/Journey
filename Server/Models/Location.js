import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Destination',
        required: true,
      },
    Country: { type: String, required: true },
    selectedFile: String,
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
const Event = mongoose.model('Location', locationSchema);

export default Event;