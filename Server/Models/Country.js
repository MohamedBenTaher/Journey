import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tripExperienceRating: {
    type: Number,
    default: 0,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  }],
});

const Country = mongoose.model('Country', countrySchema);

export default Country;