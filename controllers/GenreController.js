// controllers/GenreController.js
import { GenreService } from "../services/GenreService.js";

export const GenreController = {
  addGenre: async (req, res) => {
    const result = await GenreService.addGenre(req.body);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(201).json(result.data);
  },

  getGenreById: async (req, res) => {
    const result = await GenreService.getGenreById(req.params.genreId);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },

  getAllGenres: async (req, res) => {
    const result = await GenreService.getAllGenres();
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },

  updateGenre: async (req, res) => {
    const result = await GenreService.updateGenre(req.params.genreId, req.body);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },

  deleteGenre: async (req, res) => {
    const result = await GenreService.deleteGenre(req.params.genreId);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json(result.data);
  },
};
