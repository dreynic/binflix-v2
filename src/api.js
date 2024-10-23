import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async (page = 1) => {
  const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`);
  console.log ({ movieList : movie });
  return movie.data;
};

export const getMovieDetail = async (movie_id) => {
  const movieDetail = await axios.get(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`);
  console.log({ MovieDetail : movieDetail });
  return movieDetail.data;
}

export const getTvSeriesList = async (page = 1) => {
  const tvSeries = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&page=${page}`);
  console.log({ tvSeriesList : tvSeries });
  return tvSeries.data;
};

export const getSeriesDetail = async (series_id) => {
  const seriesDetail = await axios.get(`${baseUrl}/tv/${series_id}?api_key=${apiKey}`);
  console.log({ SeriesDetail : seriesDetail });
  return seriesDetail.data;
}

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`);
  search.data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  return search.data;
};

export const searchSeries = async (p) => {
  const searchTv = await axios.get(`${baseUrl}/search/tv?query=${p}&api_key=${apiKey}`);
  searchTv.data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  return searchTv.data;
};

export const getMovieGenres = async () => {
  const genres = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
  return genres.data.genres;
}

