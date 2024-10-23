import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'; // Import ikon yang benar

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center my-[20px]"> {/* Margin atas dan bawah 20px */}
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="px-4 py-2 bg-gray-800 text-white rounded mx-1"
      >
        <FontAwesomeIcon icon={faAngleLeft} /> {/* Menggunakan variabel ikon */}
      </button>
      <span className="px-4 py-2 text-white">{currentPage} / {totalPages}</span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="px-4 py-2 bg-gray-800 text-white rounded mx-1"
      >
        <FontAwesomeIcon icon={faAngleRight} /> {/* Menggunakan variabel ikon */}
      </button>
    </div>
  );
};

export default Pagination;