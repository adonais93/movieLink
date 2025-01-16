'use client';
import { useEffect, useState } from 'react';
import tmdb from '../../../utils/tmdbs';
import Image from 'next/image';
import Link from 'next/link';

export default function Search() {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);   // Track total pages

  useEffect(() => {
    // Obtener los parámetros de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const movieName = queryParams.get('query'); // Asumiendo que el parámetro es 'query'
    if (movieName) {
      setTitle(movieName);
    }
  }, []);

  const fetchMovies = async (page) => {
    setLoading(true);
    setError('');
    try {
      const response = await tmdb.get('/movie/popular', {
        params: {
          page: page, // Pass the current page to fetch the appropriate results
        },
      });
      const filteredMovies = response.data.results.filter(movie =>
        movie.original_title.toLowerCase().includes(title.toLowerCase())
      );

      setMovies(filteredMovies);
      setTotalPages(response.data.total_pages); // Get the total pages from the response
    } catch (error) {
      setError('Error fetching movies. Please try again later.');
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title) {
      fetchMovies(currentPage); // Fetch movies for the current page
    }
  }, [title, currentPage]); // Re-fetch when the title or currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <div className="lg:mt-20 mt-10">
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 item-center mb-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white rounded-md mr-4 "
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white rounded-md ml-4 "
        >
          Next
        </button>
      </div>
        {loading ? (
          <p className="text-gray-500 text-center">Loading movies...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mx-auto">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/single-movie?id=${movie.id}`}>
                <div className="shadow-md rounded-lg p-6 bg-white dark:bg-gray-800">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title || 'Movie Poster'}
                    width={300}
                    height={180}
                    className="rounded-md"
                  />
                  <h1 className="text-xl font-bold text-green-600 mt-4 mb-2">
                    {movie.title}
                  </h1>
                  <p className="mt-4 text-gray-500">
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p className="mt-2 text-gray-500">
                    <strong>Rating:</strong> {movie.vote_average}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No movies found...</p>
        )}
      </div>

      
    </div>
  );
}
