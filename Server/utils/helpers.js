import CustomerUser from "../Models/customerUserModel.js";
import OrganizerUser from "../Models/organizerUserModel.js";
import AdminUser from "../Models/adminschemaModel.js";
import AbstractUser from "../Models/abstractUserModel.js";

export const getUserTypeById = async (userId) => {
    const user = await AbstractUser.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    switch (user.userType) {
        case 'Customer':
            return CustomerUser.findById(userId);
        case 'Organizer':
            return OrganizerUser.findById(userId);
        case 'Admin':
            return AdminUser.findById(userId);
        default:
            throw new Error('Invalid user type');
    }
}