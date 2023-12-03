import mongoose from "mongoose";
import AbstractUser from './abstractUserModel.js';

const AdminSchema = new mongoose.Schema({
    isAdmin: { type: Boolean, default: true }
});

const AdminUser = AbstractUser.discriminator('AdminUser', AdminSchema);

export default AdminUser;