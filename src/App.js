import './App.css';
import Movies from './components/Movies/Movies';
import NavbarCustom from './components/Navbar/Navbar';
import { useState, useEffect } from "react";
import { getMovieList, getTvSeriesList, searchMovie, searchSeries } from './api';
import { Route, Routes, useLocation } from "react-router-dom";
import Series from './components/Series/Series';
import { AnimatePresence, motion } from 'framer-motion';
import Pagination from './components/Pagination/Pagination';
import MovieDetail from './components/Movies/MovieDetail';
import SeriesDetail from './components/Series/SeriesDetail';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [searchResults, setSearchResults] = useState({ movies: [], series: [] });
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [totalPages, setTotalPages] = useState(1);   // Menyimpan total halaman
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchMovies = async (page = 1) => {
      try {
        const movies = await getMovieList(page);
        setPopularMovies(movies.results);
        setTotalPages(movies.total_pages); // Set total halaman dari API
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const fetchSeries = async (page = 1) => {
      try {
        const series = await getTvSeriesList(page);
        setPopularSeries(series.results);
        setTotalPages(series.total_pages); // Set total halaman dari API
      } catch (error) {
        console.error("Failed to fetch series:", error);
      }
    };

    fetchMovies(currentPage); // Panggil fungsi dengan currentPage
    fetchSeries(currentPage); // Panggil fungsi dengan currentPage
  }, [currentPage]); // Tambahkan currentPage sebagai dependency agar terpanggil saat halaman berubah

  const search = async (q) => {
    if (q.length > 3) {
      const movieResults = await searchMovie(q);
      const seriesResults = await searchSeries(q);
      setSearchResults({
        movies: movieResults.results,
        series: seriesResults.results,
      });
    } else {
      // Reset ke popular jika search input dikosongkan
      getMovieList(currentPage).then((result) => setPopularMovies(result.results));
      getTvSeriesList(currentPage).then((result) => setPopularSeries(result.results));
      setSearchResults({ movies: [], series: [] });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage); // Ganti halaman
    }
  };

  return (
    <div className='App'>
      <NavbarCustom search={search}/>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Movies 
                  popularMovies={searchResults.movies.length > 0 ? searchResults.movies : popularMovies} 
                />
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  handlePageChange={handlePageChange} 
                />

              </motion.div>
            } 
          />
          <Route
            path="/movie/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieDetail />
              </motion.div>
            }
          />
          <Route 
            path="/series" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Series 
                  popularSeries={searchResults.series.length > 0 ? searchResults.series : popularSeries} 
                />
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  handlePageChange={handlePageChange} 
                />
              </motion.div>
            } 
          />
          <Route
            path="/series/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SeriesDetail />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;