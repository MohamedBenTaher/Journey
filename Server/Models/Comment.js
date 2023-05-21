import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;