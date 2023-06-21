import express from "express"
import { getDestination,getTopDestinations, getDestinations,getDestinationsBySearch, downvoteDestination,createDestination, upvoteDestination,updateDestination,deleteDestination, deleteS3Image, getDestinationByCountry, bookmarkDestination, cancelBookmarkDestination } from "../controllers/destination.js";
const router = express.Router();
import auth from '../Middleware/auth.js'


router.get('/search', getDestinationsBySearch);
router.get('/', getDestinations);
router.get('/top', getTopDestinations);
router.get('/:id', getDestination);
router.post('/', auth, createDestination);
router.patch('/:id', auth, updateDestination)
router.delete('/:id', auth, deleteDestination);
router.patch('/:id/upvote', auth, upvoteDestination)
router.patch('/:id/downvote', auth, downvoteDestination)
router.post('/image/delete/:id',auth,deleteS3Image)
router.get('/country/:id',auth,getDestinationByCountry)
router.patch(`/:id/bookmark`,auth, bookmarkDestination)
router.patch(`/:id/cancel`,auth, cancelBookmarkDestination)
export default router;
