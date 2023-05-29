import mongoose from "mongoose";

const continentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  tags:[String],
  countries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  }],
});

const Continent = mongoose.model('Continent', continentSchema);
export default Continent;
