import Favourite from '../models/favourite.model.js';
import { errorHandler } from '../utils/error.js';

// Add to favourites
export const addToFavourites = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const existingFavourite = await Favourite.findOne({ userId, postId });
    if (existingFavourite) {
      return res.status(200).json({ 
        success: false, 
        message: 'Post is already in favourites' 
      });
    }


    const newFavourite = new Favourite({
      userId,
      postId,
      post: postId
    });

    await newFavourite.save();
    res.status(200).json('Post has been added to favourites');
  } catch (error) {
    next(error);
  }
};

// Remove from favourites
export const removeFromFavourites = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const favourite = await Favourite.findOne({ userId, postId });
    if (!favourite) {
      return next(errorHandler(404, 'Favourite not found'));
    }

    await Favourite.findOneAndDelete({ userId, postId });
    res.status(200).json('Post has been removed from favourites');
  } catch (error) {
    next(error);
  }
};

// Get user's favourites
export const getFavourites = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favourites = await Favourite.find({ userId })
      .populate('post')
      .sort({ createdAt: -1 });
    res.status(200).json(favourites);
  } catch (error) {
    next(error);
  }
};

// Check if post is favourited
export const checkFavourite = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    
    const favourite = await Favourite.findOne({ userId, postId });
    res.status(200).json({ isFavourite: !!favourite });
  } catch (error) {
    next(error);
  }
};