import { searchMedia } from "../services/tmdbServices.js";

const search = async (req, res) => {
  try {
    const { q, type } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query required" });
    }

    const mediaType = type || "multi";

    const results = await searchMedia(q, mediaType);

    const formattedResults = results.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      posterPath: item.poster_path,
      releaseDate: item.release_date || item.first_air_date,
      overview: item.overview,
      mediaType: item.media_type || mediaType,
    }));

    res.json({
      query: q,
      results: formattedResults,
      count: formattedResults.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { search };
