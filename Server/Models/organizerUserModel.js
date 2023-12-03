import mongoose from "mongoose";
import AbstractUser from './abstractUserModel.js';

const organizerUserSchema = new mongoose.Schema({
    organization_name: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    website: { type: String },
    contact_email: { type: String },
    phone_number: { type: String },
    social_media: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        instagram: { type: String }
    },
    logo: { type: String },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: String },
        country: { type: String }
    },
    events_organized: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const OrganizerUser = AbstractUser.discriminator('OrganizerUser', organizerUserSchema);

export default OrganizerUser;
