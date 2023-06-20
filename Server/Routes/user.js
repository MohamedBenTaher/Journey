import express from "express"
import {getUser, signin,signup} from "../controllers/user.js";
import { bookmarkResource, cancelBookmarkResource } from "../controllers/general.js";
import auth from "../Middleware/auth.js";

const router= express.Router();


router.post('/signin',signin);
router.post('/signup',signup);
router.get('/me/:id',auth,getUser)
router.patch(`/:id/bookmark`,auth, bookmarkResource)
router.patch(`/:id/cancel`,auth, cancelBookmarkResource)
export default router;