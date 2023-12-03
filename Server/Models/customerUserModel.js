import mongoose from "mongoose";
import AbstractUser from './abstractUserModel.js';

const customerUserSchema = new mongoose.Schema({
  savedCities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  }],
  savedCountries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  }],
  savedLocations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  savedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostMessage',
  }],
  savedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  likedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostMessage',
  }],
  likedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  likedLocations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  likedCities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  }],
  likedCountries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  }],
});

const CustomerUser = AbstractUser.discriminator('CustomerUser', customerUserSchema);

export default CustomerUser;