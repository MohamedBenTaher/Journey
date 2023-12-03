import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';
import OrganizerUser from '../Models/organizerUserModel.js';
import CustomerUser from '../Models/customerUserModel.js';
import AbstractUser from '../Models/abstractUserModel.js';



export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await AbstractUser.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'User Unfound' });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials' });
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {
      expiresIn: '2 days'
    });
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: 'Something Went Wrong !', error });
  }
};

export const signupOrganizer = async (req, res) => {
  const {
    email,
    password,
    name,
    confirmPassword,
    organization_name,
    description,
    created_at,
    website,
    contact_email,
    phone_number,
    social_media,
    logo,
    address
  } = req.body;

  try {
    const existingUser = await OrganizerUser.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

     const result = await OrganizerUser.create({
      email,
      password: hashedPassword,
      name,
      organization_name,
      description,
      created_at,
      website,
      contact_email,
      phone_number,
      userType: 'Organizer',
      social_media,
      logo,
      address
    });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const signupCustomer = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword, birthday, address } = req.body;

  try {
    const existingUser = await CustomerUser.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await CustomerUser.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            userType: 'Customer',
            birthday,
            address
        });
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await OrganizerUser.findById(id)
      .populate('savedCities')
      .populate('savedLocations')
      .populate('savedStories')
      .populate('savedEvents')
      .populate('likedStories')
      .populate('likedEvents')
      .populate('likedLocations')
      .populate('likedCities')
      .populate('likedCountries');

    if (!user) {
      user = await CustomerUser.findById(id)
        .populate('savedCities')
        .populate('savedLocations')
        .populate('savedStories')
        .populate('savedEvents')
        .populate('likedStories')
        .populate('likedEvents')
        .populate('likedLocations')
        .populate('likedCities')
        .populate('likedCountries');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
