import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToWatchlist,
  getWatchlist,
  updateWatchlistItem,
  deleteWatchlistItem,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToWatchlist);
router.get("/", getWatchlist);
router.put("/:id", updateWatchlistItem);
router.delete("/:id", deleteWatchlistItem);

export default router;
