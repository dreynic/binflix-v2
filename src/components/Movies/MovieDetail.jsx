import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilm, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function MovieDetail() {
  const { id } = useParams(); // Dapatkan movie_id dari URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieData = await getMovieDetail(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div>Loading...</div>; // Tampilkan loading jika data belum ada

  return (
    <div className="text-white px-[7%] flex mt-24 mb-10 ml-[5%] bg-gradient-to-t">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg w-72"
      />
      <div className="text-left ml-10">
        <h1 className="text-4xl font-bold mb-5">{movie.title}</h1>
        <p className="text-2xl font-bold mb-5 text-white"><FontAwesomeIcon icon={faStar} /> {movie.vote_average}</p>
        <div className="mb-5 w-[80%] min-w-[60%]">
            <p className="text-2xl mb-1 font-semibold text-white ">Synopsis: </p>
            <p className="text-lg text-white">{movie.overview}</p>
        </div>
        <div className="mb-5">
            <p className="text-2xl mb-1 font-semibold text-white">Release Date: </p>
            <p className="text-lg text-white">{movie.release_date}</p>
        </div>
        <div className="flex gap-5">
            <div className="border-solid border-2 border-slate-600 w-24 p-2 text-center rounded-lg cursor-pointer transition hover:scale-110">
                <p><FontAwesomeIcon icon={faFilm}/></p>
                <p>Trailer</p>
            </div>
            <div className="bg-white w-24 p-2 text-center rounded-lg cursor-pointer transition hover:scale-110">
                <p className="text-black"><FontAwesomeIcon icon={faPlay}/></p>
                <p className="text-black">Play</p>
            </div>
        </div>
      </div>
    </div>
  );
}
