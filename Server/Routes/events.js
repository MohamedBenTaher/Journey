import express from "express"
import { getEventsBySearch, getEvents,getTopEvents, getEvent, createEvent, updateEvent, deleteEvent, commentEvent, attendEvent, cancelEvent,bookmarkEvent,cancelBookmarkEvent, likeEvent } from "../controllers/event.js";
const router = express.Router();
import auth from '../Middleware/auth.js'

router.get('/search', getEventsBySearch);
router.get('/', getEvents);
router.get('/top', getTopEvents);
router.get('/:id', getEvent);
router.post('/', auth, createEvent);
router.patch('/:id', auth, updateEvent)
router.delete('/:id', auth, deleteEvent);
router.patch('/:id/attendance/attend', auth, attendEvent)
router.patch('/:id/attendance/cancel', auth, cancelEvent)
router.post('/:id/comment', auth, commentEvent)
router.patch(`/:id/bookmark`,auth, bookmarkEvent)
router.patch(`/:id/cancel`,auth, cancelBookmarkEvent)
router.patch(`/:id/like`,auth, likeEvent)
export default router;
