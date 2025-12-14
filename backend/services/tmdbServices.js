import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const searchMedia = async (query, mediaType = "multi") => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/${mediaType}`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error(`TMDB search failed: ${error.message}`);
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error.message}`);
  }
};

const getTVDetails = async (tvId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${tvId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch TV details: ${error.message}`);
  }
};

export { searchMedia, getMovieDetails, getTVDetails };
