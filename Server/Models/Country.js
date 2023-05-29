import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  coverImage: {
    type: String,
    required: true,
  },
  continent: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Continent',
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  }],
});

const Country = mongoose.model('Country', countrySchema);

export default Country;