import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeriesDetail } from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilm, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function SeriesDetail() {
  const { id } = useParams(); // Dapatkan series_id dari URL
  const [series, setSeries] = useState(null);

  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        const seriesData = await getSeriesDetail(id);
        setSeries(seriesData);
      } catch (error) {
        console.error("Failed to fetch series details:", error);
      }
    };

    fetchSeriesDetail();
  }, [id]);

  if (!series) return <div>Loading...</div>; // Tampilkan loading jika data belum ada

  return (
    <div className="text-white px-[7%] flex mt-24 mb-10 ml-[5%] bg-gradient-to-t">
      <img
        src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
        alt={series.name}
        className="rounded-lg w-72"
      />
      <div className="text-left ml-10">
        <h1 className="text-4xl font-bold mb-5">{series.name}</h1>
        <p className="text-2xl font-bold mb-5 text-white"><FontAwesomeIcon icon={faStar} /> {series.vote_average}</p>
        <div className="mb-5 w-[80%] min-w-[60%]">
            <p className="text-2xl mb-1 font-semibold text-white ">Synopsis: </p>
            <p className="text-lg text-white">{series.overview}</p>
        </div>
        <div className="mb-5">
            <p className="text-2xl mb-1 font-semibold text-white">Release Date: </p>
            <p className="text-lg text-white">{series.first_air_date}</p>
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