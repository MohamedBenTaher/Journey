import express from "express"
import { getPostsBySearch,getPosts ,getPost,createPost,updatePost,deletePost ,likePost,commentPost, bookmarkPost, cancelBookmarkPost, getTopPosts} from "../controllers/post.js";
const router= express.Router();
import auth from '../Middleware/auth.js'

router.get('/search',getPostsBySearch );
router.get('/', getPosts);
router.get('/top', getTopPosts);
router.get('/:id', getPost);
router.post('/', auth,createPost);
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost);
router.patch('/:id/like',auth,likePost)
router.post('/:id/comment',auth,commentPost)
router.patch(`/:id/bookmark`,auth, bookmarkPost)
router.patch(`/:id/cancel`,auth, cancelBookmarkPost)
export default router;
