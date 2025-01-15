'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import tmdb from '../../../utils/tmdbs';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies when the page is loaded or when currentPage changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdb.get('/movie/popular', {
          params: { page: currentPage },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        console.log(response.data.results.length=1000);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]); // This effect runs when currentPage changes

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex-col h-auto w-full  flex justify-center space-y-2 text-gray-100">
        <div className="w-[80%] flex justify-center items-center mx-auto">
          <div className="w-full flex justify-between">
            <button
              onClick={prevPage}
              className="flex items-center p-2 justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              prev
            </button>

            <div className="flex space-x-2">
              <p className="text-sm">Página:</p>
              <p className="text-sm font-light">{currentPage}</p>
              <p className="text-sm">de</p>
              <p className="text-sm font-light">{totalPages}</p>
            </div>

            <button
              onClick={nextPage}
              className="flex items-center p-2 justify-center"
            >
              next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 p-4 transition ">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-indigo-700 rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.original_title}
                width={500}
                height={300}
                className="rounded-md"
              />
              <h2 className="uppercase text-md text-green-600 font-bold text-center mt-2">
                {movie.original_title}
              </h2>
              <p className="text-sm text-justify text-gray-300 mt-2">
                {movie.overview.length > 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </p>

              <div className="flex justify-between items-center mt-4">
              
                <Link
                  href={{ pathname: '/single-movie', query: { id: movie.id } }}
                  className="text-gray-200"
                >
                  <button  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 w-full">
                  Ver más
                  </button> 
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
