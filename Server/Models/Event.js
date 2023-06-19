import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: {type:String,required:true},
    creator: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
      },
    tags: [String],
    coverImage:{type:String,required:true},
    numberOfPlaces: { type: Number, required: true },
    eventFee: { type: String, required: true },
    discountRate: { type: String, required: true },
    attendants: {
        type: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
          }],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const Event = mongoose.model('Event', eventSchema);

export default Event;