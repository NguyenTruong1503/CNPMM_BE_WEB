// controllers/RatingController.js
import { RatingService } from "../services/RatingService.js";

export const RatingController = {
  addRating: async (req, res) => {
    const result = await RatingService.addRating(req.body);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(201).json(result.data);
  },

  getRatingById: async (req, res) => {
    const result = await RatingService.getRatingById(req.params.ratingId);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },

  getRatingsByBookId: async (req, res) => {
    const result = await RatingService.getRatingsByBookId(req.params.bookId);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },

  updateRating: async (req, res) => {
    const result = await RatingService.updateRating(
      req.params.ratingId,
      req.body
    );
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },

  deleteRating: async (req, res) => {
    const result = await RatingService.deleteRating(req.params.ratingId);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },
  getAllRating: async (req, res) => {
    const result = await RatingService.getAllRating();
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  }
};
