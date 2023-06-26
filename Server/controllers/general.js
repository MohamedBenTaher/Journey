import PostMessage from '../models/PostMessage.js';
import Country from '../Models/Country.js';
import Event from '../Models/Event.js';
import Location from '../Models/Location.js';
import Destination from '../Models/Destination.js';
import User from '../Models/User.js';

export const likeResource = async (req, res) => {
  const { resourceId, resourceName } = req.body;
  const userId = req.userId;

  try {
    let resource;
    switch (resourceName) {
      case 'PostMessage':
        resource = await PostMessage.findById(resourceId);
        break;
      case 'event':
        resource = await Event.findById(resourceId);
        break;
      case 'location':
        resource = await Location.findById(resourceId);
        break;
      case 'destination':
        resource = await Destination.findById(resourceId);
        break;
      case 'country':
        resource = await Country.findById(resourceId);
        break;
      default:
        return res.status(400).json({ message: 'Invalid resource type' });
    }

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.likes.includes(resourceId)) {
      return res.status(400).json({ message: 'Resource already liked' });
    }

    user.likes.push(resourceId);
    resource.likedBy.push(userId);

    await user.save();
    await resource.save();

    res.status(200).json({ message: 'Resource liked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const unlikeResource = async (req, res) => {
  const { resourceId, resourceName } = req.body;
  const userId = req.userId;

  try {
    let resource;
    switch (resourceName) {
      case 'PostMessage':
        resource = await PostMessage.findById(resourceId);
        break;
      case 'event':
        resource = await Event.findById(resourceId);
        break;
      case 'location':
        resource = await Location.findById(resourceId);
        break;
      case 'destination':
        resource = await Destination.findById(resourceId);
        break;
      case 'country':
        resource = await Country.findById(resourceId);
        break;
      default:
        return res.status(400).json({ message: 'Invalid resource type' });
    }

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.likes.includes(resourceId)) {
      return res.status(400).json({ message: 'Resource not liked' });
    }

    user.likes.pull(resourceId);
    resource.likedBy.pull(userId);

    await user.save();
    await resource.save();

    res.status(200).json({ message: 'Resource unliked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const bookmarkResource = async (req, res) => {
  const { id, resourceName } = req.body;
  const userId = req.params.id;
  try {
    let resource;
    switch (resourceName) {
      case 'PostMessage':
        resource = await PostMessage.findById(id);
        break;
      case 'event':
        resource = await Event.findById(id);
        break;
      case 'location':
        resource = await Location.findById(id);
        break;
      case 'destination':
        resource = await Destination.findById(id);
        break;
      case 'country':
        resource = await Country.findById(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid resource type' });
    }

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.savedResources.find((bookmark)=>bookmark.resourceId==id)) {
      return res.status(400).json({ message: 'Resource already bookmarked' });
    }

    user.savedResources.push({id,type:resourceName});
    resource.bookmarkedBy.push(userId);

    await user.save();
    await resource.save();

    res.status(200).json({ message: 'Resource bookmarked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' ,...error});
  }
};

export const cancelBookmarkResource = async (req, res) => {
  const { resourceId, resourceName } = req.body;
  const userId = req.userId;

  try {
    let resource;
    switch (resourceName) {
      case 'PostMessage':
        resource = await PostMessage.findById(resourceId);
        break;
      case 'event':
        resource = await Event.findById(resourceId);
        break;
      case 'location':
        resource = await Location.findById(resourceId);
        break;
      case 'destination':
        resource = await Destination.findById(resourceId);
        break;
      case 'country':
        resource = await Country.findById(resourceId);
        break;
      default:
        return res.status(400).json({ message: 'Invalid resource type' });
    }

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.bookmarks.includes(resourceId)) {
      return res.status(400).json({ message: 'Resource not bookmarked' });
    }

    user.bookmarks.pull(resourceId);
    resource.bookmarkedBy.pull(userId);

    await user.save();
    await resource.save();

    res.status(200).json({ message: 'Bookmark canceled' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};