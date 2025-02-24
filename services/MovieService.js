import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const MovieService = {
  getMovies: async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      return response.data;
      console.log('Movies', response.data);
    } catch (error) {
      throw new Error(
        error.response?.data?.message
      );
    }
  },

  getMovie: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  },

  addMovie: async (movie) => {
    try {
      const response = await axios.post(`${API_URL}/movies`, movie);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add movie');
    }
  },

  updateMovie: async (id, movie) => {
    try {
      const response = await axios.put(`${API_URL}/movies/${id}`, movie);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to update movie'
      );
    }
  },

  deleteMovie: async (id) => {
    try {
      await axios.delete(`${API_URL}/movies/${id}`);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete movie'
      );
    }
  },
};
