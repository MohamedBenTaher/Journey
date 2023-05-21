import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
        content: {
          type: String,
          required: true,
        },
        user: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required: true,
        },
        entity: {
          type: {
            type: String,
            enum: ['Destination', 'Restaurant'], // Add more entity types as needed
            required: true,
          },
          entityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;