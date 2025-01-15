'use client';
import { useEffect, useState } from 'react';
import tmdb from '../../../utils/tmdbs';
import Image from 'next/image';
export default function Search() {
  const [title, setTitle] = useState('');
  const [moviesId, setMoviesId] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Obtener los parámetros de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const movieName = queryParams.get('query'); // Asumiendo que el parámetro es 'query'
    console.log('Movie name from URL:', movieName);
    
    if (movieName) {
      setTitle(movieName);
    }
    // Este se ejecutará cuando 'title' cambie
    console.log('Updated Movie name:', title);

    const fetchMovies = async () => {
      try {
        const response = await tmdb.get('/movie/popular');
        console.log(
          'movies:', 
          response.data.results.filter(movie =>  movie.original_title.toLowerCase().includes(title.toLowerCase()))
        );
        setMoviesId(response.data.results.filter(movie =>  movie.original_title.toLowerCase().includes(title.toLowerCase())).map(movie => movie.id));
        
        //setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [title]);
  console.log("id: ", moviesId);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!moviesId) return;

      try {
        const response = await tmdb.get(`/movie/${moviesId}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [moviesId]);
  return (
    <div>
       <div className="lg:mt-20 mt-10">
              {movieDetails ? (
                <div className="lg:flex  shadow-md rounded-lg p-6 mt-14 sm:mb-5 md:mb-5 w-[90%] mx-auto">
                  <div className="ml-4">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                      alt={movieDetails.title || 'Movie Poster'}
                      width={1000}
                      height={600}
                      className="rounded-md"
                    />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">{movieDetails.title}</h1>
                    <p className="text-gray-100 mb-4">{movieDetails.overview}</p>
                    <p className="mt-4 text-gray-100">
                      <strong>Release Date:</strong> {movieDetails.release_date}
                    </p>
                    <p className="mt-2 text-gray-100">
                      <strong>Rating:</strong> {movieDetails.vote_average}
                    </p>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 mt-10" 
                      onClick={() => saveMovieToLocalStorage(movieDetails.id)}
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center">Loading movie details...</p>
              )}
            </div>
    </div>
  );
}
