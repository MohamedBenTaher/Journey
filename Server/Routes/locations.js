import express from "express"
import { getLocation,getTopLocations, getLocations,getLocationsBySearch, rateLocation,createLocation,updateLocation,deleteLocation, deleteS3Image, getLocationByDestination,getLocationByCountry, bookmarkLocation, cancelBookmarkLocation } from "../controllers/Location.js";
const router = express.Router();
import auth from '../Middleware/auth.js'


router.get('/search', getLocationsBySearch);
router.get('/', getLocations);
router.get('/top', getTopLocations);
router.get('/:id', getLocation);
router.post('/', auth, createLocation);
router.patch('/:id', auth, updateLocation)
router.delete('/:id', auth, deleteLocation);
router.patch('/:id/rate', auth, rateLocation)
router.post('/image/delete/:id',auth,deleteS3Image)
router.get('/destination/:id',auth,getLocationByDestination)
router.get('/country/:id',auth,getLocationByCountry)
router.patch(`/:id/bookmark`,auth,bookmarkLocation)
router.patch(`/:id/cancel`,auth, cancelBookmarkLocation)
export default router;
