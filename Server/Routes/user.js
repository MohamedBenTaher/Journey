import express from "express"
import {getUser, signin,signupCustomer,signupOrganizer} from "../controllers/user.js";
import auth from "../Middleware/auth.js";

const router= express.Router();


router.post('/signin',signin);
router.post('/customer/signup',signupCustomer);
router.post('/organizer/signup',signupOrganizer);
router.get('/me/:id',auth,getUser)
export default router;