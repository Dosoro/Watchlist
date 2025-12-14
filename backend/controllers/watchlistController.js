import WatchlistItem from "../models/WatchlistItems.js";

// Create watchlist item
const addToWatchlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { tmdbId, mediaType, title, posterUrl, releaseDate, overview } =
      req.body;

    if (!tmdbId || !mediaType || !title) {
      return res
        .status(400)
        .json({ error: "tbdbId, mediaType and title are required" });
    }

    const existingItem = await WatchlistItem.findOne({ userId, tmdbId });
    if (existingItem) {
      return res.status(400).json({ error: "Item already in your watchlist" });
    }

    const watchlistItem = await WatchlistItem.create({
      userId,
      tmdbId,
      mediaType,
      title,
      posterUrl,
      releaseDate,
      overview,
    });

    res.status(201).json({
      message: "Item added to watchlist",
      item: watchlistItem,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const items = await WatchlistItem.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await WatchlistItem.countDocuments({ userId });

    res.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update watchlist item
const updateWatchlistItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { userRating, notes, isWatched, dateWatched, priority } = req.body;

    const item = await WatchlistItem.findById(id);
    if (!item) {
      return res.status(400).json({ error: "Item not found" });
    }

    if (item.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this item" });
    }

    if (userRating !== undefined) item.userRating = userRating;
    if (notes !== undefined) item.notes = notes;
    if (isWatched !== undefined) item.isWatched = isWatched;
    if (dateWatched !== undefined) item.dateWatched = dateWatched;
    if (priority !== undefined) item.priority = priority;

    await item.save();

    res.json({
      message: "Item updated",
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWatchlistItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const item = await WatchlistItem.findById(id);
    if (!item) {
      return res.status(400).json({ error: "Item not found" });
    }

    if (item.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this item" });
    }

    await WatchlistItem.findByIdAndDelete(id);

    res.json({
      message: "Item deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addToWatchlist,
  getWatchlist,
  updateWatchlistItem,
  deleteWatchlistItem,
};
