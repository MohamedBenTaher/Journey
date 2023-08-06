import express from "express"
import { getContinent,getTopContinents, getContinents,getContinentsBySearch, createContinent, updateContinent,deleteContinents } from "../controllers/Continent.js";
const router = express.Router();
import auth from '../Middleware/auth'


router.get('/search', getContinentsBySearch);
router.get('/', getContinents);
router.get('/top', getTopContinents);
router.get('/:id', getContinent);
router.post('/', auth, createContinent);
router.patch('/:id', auth, updateContinent)
router.delete('/:id', auth, deleteContinents);
// router.patch('/:id/upvote', auth, upvoteDestination)
// router.patch('/:id/downvote', auth, downvoteDestination)

export default router;