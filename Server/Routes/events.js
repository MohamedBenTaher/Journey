import express from "express"
import { getEventsBySearch, getEvents, getEvent, createEvent, updateEvent, deleteEvent, commentEvent, attendEvent } from "../controllers/event.js";
const router = express.Router();
import auth from '../Middleware/auth.js'

router.get('/search', getEventsBySearch);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', auth, createEvent);
router.patch('/:id', auth, updateEvent)
router.delete('/:id', auth, deleteEvent);
router.patch('/:id/attend', auth, attendEvent)
router.post('/:id/comment', auth, commentEvent)

export default router;
