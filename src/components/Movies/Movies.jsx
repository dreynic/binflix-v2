import { useNavigate } from "react-router-dom";

const Movies = ({ popularMovies }) => {
  const imgUrl = process.env.REACT_APP_BASEIMGURL;
  const navigate = useNavigate();

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div
          key={i}
          className="w-[150px] sm:w-[175px] md:w-[200px] text-white mx-1 cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)} // Navigasi ke halaman detail saat diklik
        >
          <img
            src={`${imgUrl}${movie.poster_path}`}
            alt={movie.title}
            className="mb-3 w-auto rounded-2xl transition hover:scale-105 hover:ease-in-out"
          />
          <div className="text-xl font-bold mb-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {movie.title}
          </div>
          <div className="text-lg mb-1 text-left">
            {movie.release_date}
          </div>
          <div className="text-lg font-medium text-red-500 text-left">
            &#9733; {movie.vote_average}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="text-center mt-20">
      <div className="text-center text-red-600 mb-5 text-3xl font-bold">Popular Movies</div>
      <div className="bg-gray-950 min-h-screen flex flex-col justify-center items-center text-white">
        <div className="w-full flex flex-wrap justify-center gap-6 bg-gray-950">
          <PopularMovieList />
        </div>
      </div>
    </div>
  );
};

export default Movies;