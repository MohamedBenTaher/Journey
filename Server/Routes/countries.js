import express from "express"
import { getTopCountries,getCountry, getCountries,getCountrysBySearch, likeCountry,createCountry, updateCountry,deleteCountry } from "../controllers/Country.js";
const router = express.Router();
import auth from '../Middleware/auth.js'


router.get('/search', getCountrysBySearch);
router.get('/', getCountries);
router.get('/top', getTopCountries);
router.get('/:id', getCountry);
router.post('/', auth, createCountry);
router.patch('/:id', auth, updateCountry)
router.delete('/:id', auth, deleteCountry);
router.patch('/:id/like', auth, likeCountry)


export default router;
