import express from "express"
import { commentEntity ,deleteCommentEntity,getEntityComments, updateCommentEntity} from "../controllers/Comment.js";
import auth from '../Middleware/auth.js'
const router = express.Router();
router.post('/:id/comment', auth, commentEntity)
router.get('/:id',getEntityComments)
router.patch('/:id',auth,updateCommentEntity)
router.delete('/:id',auth,deleteCommentEntity)

export default router;