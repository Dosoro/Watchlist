import mongoose from "mongoose";

const watchlistItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tmdbId: {
      type: Number,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterUrl: String,
    releaseDate: String,
    overview: String,
    userRating: {
      type: Number,
      min: 0,
      max: 10,
    },
    notes: String,
    isWatched: {
      type: Boolean,
      default: false,
    },
    dateWatched: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

watchlistItemSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

const WatchlistItem = mongoose.model("WatchlistItem", watchlistItemSchema);

export default WatchlistItem;
