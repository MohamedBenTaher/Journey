import express from "express"
import {signin,signup} from "../controllers/user.js";
import { bookmarkResource } from "../controllers/general.js";
import auth from "../Middleware/auth.js";

const router= express.Router();


router.post('/signin',signin);
router.post('/signup',signup);
router.patch(`/${id}/bookmark`,auth, bookmarkResource)
export default router;