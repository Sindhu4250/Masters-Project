import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  { timestamps: true }
);

// Compound index to prevent duplicate favourites
favouriteSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Favourite = mongoose.model('Favourite', favouriteSchema);
export default Favourite;