import express from "express"
import { getPostsBySearch,getPosts ,getPost,createPost,updatePost,deletePost ,likePost,commentPost} from "../controllers/post.js";
const router= express.Router();
import auth from '../Middleware/auth.js'

router.get('/search',getPostsBySearch );
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth,createPost);
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost);
router.patch('/:id/like',auth,likePost)
router.post('/:id/comment',auth,commentPost)

export default router;
