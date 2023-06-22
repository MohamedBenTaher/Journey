import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, 
  age: { type: Number },
  address: { type: String },
  type: {type:String,Enumerator:['Location','city','country']},
    savedCities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Destination'
    }],
    savedLocations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Location'
    }],
    savedStories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'PostMessage'
    }],
   savedEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Event'
    }],
  likedStories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'PostMessage'
    }],
  likedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Event'
  }],
  likedLocations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Location'
  }],
likedCities: [{
  type: mongoose.Schema.Types.ObjectId,
  ref:'Destination'
}],
});

const User = mongoose.model('User', userSchema);

export default User;
