import mongoose from "mongoose";
import Location from "../Models/Location"
export const getLocations = async (req, res) => {
    const { page } = req.query;
    try {
        const Limit = 8;
        const startIndex = (Number(page) - 1) * Limit;
        const total = await Location.countDocuments({});

        const events = await Location.find().sort({ _id: -1 }).limit(Limit).skip(startIndex);

        res.status(200).json({ data: events, currentPage: Number(page), NumberOfPages: Math.ceil(total / Limit) })
    } catch (error) {
        res.status(404).json({ message: error.essage })
    }
}
export const getLocation = async (req, res) => {
    const { id } = req.params;
    try {

        const event = await Location.findById(id);

        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.essage })
    }
}
export const createLocation = async (req, res) => {
    const location = req.body;

    const newlocation = new Location({ ...location, createdAt: new Date().toISOString() })
    try {
        await newlocation.save();
        res.status(201).json(newlocation);
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
//update Location data in all events 
export const updateLocation = async (req, res) => {
    const { id: _id } = req.params;
    const location = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No Locations with this Id');
    }
    const updatedLocation = await Location.findByIdAndUpdate(_id, location, { new: true })
    res.json(updatedLocation);
}

// delete all locations in events and journies 
export const deleteLocation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Location.findByIdAndRemove(id);

    res.json({ message: "Location deleted successfully." });
}



export const getLocationsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i');
        const locations = await Location.find({ $or: [{ title }, { tags: { $in: tags?.split(',') } }] })
        res.json({ data: locations });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const rateLocation = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const location = await Location.findById(id)
        location.avgRating = (location.avgRating + value) / 2
        Location.findByIdAndUpdate(id, location, { new: true });
        res.status(200).json({ data: location })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

