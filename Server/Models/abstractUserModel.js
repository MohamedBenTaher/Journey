import mongoose from "mongoose";

const abstractUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
        type: String,
        required: true,
        enum: ['Customer', 'Organizer', 'Admin']
  },
  birthday: { type: Date },
  address: { type: String },
});

const AbstractUser = mongoose.model('AbstractUser', abstractUserSchema);

export default AbstractUser;