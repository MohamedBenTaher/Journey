import mongoose from 'mongoose';
import Event from '../Models/Event.js';
import s3 from '../awsConfig.js';
import { v4 as uuidv4 } from 'uuid';
import User from '../Models/user.js';

export const getTopEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('creator')
      .sort({ upvotes: -1, downvotes: 1 })
      .limit(4)
      .exec();

    res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const bookmarkEvent = async (req, res) => {
  const { userId } = req.body;
  const id = req.params.id;
  console.log('ids', id, userId);
  try {
    const resource = await Event.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.savedEvents.find((bookmark) => bookmark == id)) {
      return res.status(400).json({ message: 'Event already bookmarked' });
    }
    user.savedEvents.push(id);
    resource.bookmarkedBy.push(userId);
    await user.save();
    await resource.save();
    res.status(200).json({ message: 'Event bookmarked', resource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', ...error });
  }
};
export const likeEvent = async (req, res) => {
  const { userId } = req.body;
  const id = req.params.id;
  try {
    const resource = await Event.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (resource.likedBy.includes(userId)) {
      user.likedEvents.pull(id);
      resource.likedBy.pull(userId);
      await user.save();
      await resource.save();
      return res.status(200).json({ message: 'Event Unliked' });
    } else {
      user.likedEvents.push(id);
      resource.likedBy.push(userId);
      await user.save();
      await resource.save();
      res.status(200).json({ message: 'Event Liked' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const cancelBookmarkEvent = async (req, res) => {
  const { userId } = req.body;
  const id = req.params.id;
  console.log('called cancel');
  try {
    let resource;
    resource = await Event.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.savedEvents.includes(id)) {
      return res.status(400).json({ message: 'Event not bookmarked' });
    }
    console.log('the ueser resource', id, userId);
    user.savedEvents.pull(id);
    resource.bookmarkedBy.pull(userId);
    await user.save();
    await resource.save();
    return res.status(200).json({ message: 'Bookmark canceled' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const getEvents = async (req, res) => {
  const { page } = req.query;
  try {
    const Limit = 8;
    const startIndex = (Number(page) - 1) * Limit;
    const total = await Event.countDocuments({});

    const events = await Event.find()
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex)
      .populate('creator');

    res
      .status(200)
      .json({ data: events, currentPage: Number(page), numberOfPages: Math.ceil(total / Limit) });
  } catch (error) {
    res.status(404).json({ message: error.essage });
  }
};
export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('creator');
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.essage });
  }
};
export const createEvent = async (req, res) => {
  const event = req.body;
  const files = req.files;
  console.log('req', req, 'files', files);
  const fileKey = uuidv4();
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey.toString(),
    Body: files.coverImage.data,
    ContentType: 'image/jpeg'
  };
  let uploadResult;
  try {
    uploadResult = await s3.upload(uploadParams).promise();
  } catch (err) {
    console.log(err);
  }
  const Fileurl = uploadResult?.Location || '';
  event.coverImage = Fileurl;
  event.creator = mongoose.Types.ObjectId(event?.creator);
  const newEvent = new Event({ ...event, createdAt: new Date().toISOString() });
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id: _id } = req.params;
  const event = req.body;
  const files = req.files;
  console.log('req', req, 'files', files);
  if (files) {
    const fileKey = uuidv4();
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey.toString(),
      Body: files.coverImage.data,
      ContentType: 'image/jpeg'
    };
    let uploadResult;
    try {
      uploadResult = await s3.upload(uploadParams).promise();
    } catch (err) {
      console.log(err);
    }
    const Fileurl = uploadResult?.Location || '';
    event.coverImage = Fileurl;
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No Events with this Id');
  }
  const updatedEvent = await Event.findByIdAndUpdate(_id, event, { new: true });
  res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Event.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully.' });
};

export const attendEvent = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ mesage: 'Unauthenticated' });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);
  const event = await Event.findById(id);
  console.log(event.attendants);
  const index = event.attendants.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    if (event.attendants.length === event.numberOfPlaces) {
      res.status(204).json('the event is fully booked');
    } else {
      event.attendants.push(req.userId);
    }
  }
  const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
  res.status(200).json(updatedEvent);
};
export const cancelEvent = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ mesage: 'Unauthenticated' });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);
  const event = await Event.findById(id);
  console.log(event.attendants);
  const index = event.attendants.findIndex((id) => id === String(req.userId));
  if (index !== -1) {
    event.attendants = event?.attendants?.fliter((id) => id !== String(req.userId));
  }
  const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
  res.status(200).json(updatedEvent);
};
export const commentEvent = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const event = await Event.findById(id);
  event.comments.push(value);

  const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
  res.json(updatedEvent);
};

export const getEventsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');
    const events = await Event.find({ $or: [{ title }, { tags: { $in: tags?.split(',') } }] });
    res.json({ data: events });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getEventsByCreator = async (req, res) => {
  const { id } = req.params;
  try {
    const events = await Event.find({ id });

    res.json({ data: events });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
