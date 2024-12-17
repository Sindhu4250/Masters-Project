import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  checkFavourite
} from '../controllers/favourite.controller.js';

const router = express.Router();

router.post('/add', verifyToken, addToFavourites);
router.delete('/remove/:postId', verifyToken, removeFromFavourites);
router.get('/get', verifyToken, getFavourites);
router.get('/check/:postId', verifyToken, checkFavourite);

export default router;