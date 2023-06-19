import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, 
  age: { type: Number },
  address: { type: String },
  type: {type:String,Enumerator:['Location','city','country']},
  savedResources: [{
    type: {
      type: String,
      enum: ['Destination', 'Location','PostMessage','Event','City','Country'], // Add more entity types as needed
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    required:false
  }],
  likedResources: [{
    type: {
      type: String,
      enum: ['Destination', 'Location','PostMessage','Event','City','Country'], // Add more entity types as needed
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    required:false
  }],
});

const User = mongoose.model('User', userSchema);

export default User;
