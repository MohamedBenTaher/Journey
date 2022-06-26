import express from "express"
import { getPostsBySearch,getPosts ,createPost,updatePost,deletePost ,likePost} from "../controllers/post.js";
const router= express.Router();
import auth from '../Middleware/auth.js'

router.get('/search',getPostsBySearch );
router.get('/', getPosts);
router.post('/', auth,createPost);
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost)
export default router;