import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, 
  age: { type: Number },
  address: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;
