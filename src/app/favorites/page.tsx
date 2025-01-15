/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react';
import tmdb from '../../../utils/tmdbs'; // Asegúrate de tener configurado tmdb
import Link from 'next/link';

const Favorites = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const moviesFromLocalStorage = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setSavedMovies(moviesFromLocalStorage);

    // Cargar detalles de las películas usando los IDs guardados
    const fetchMoviesDetails = async () => {
      const details = await Promise.all(
        moviesFromLocalStorage.map(async (movieId) => {
          const response = await tmdb.get(`/movie/${movieId}`);
          return response.data; // Devuelve los detalles de la película
        })
      );
      setMovieDetails(details); // Actualiza el estado con los detalles
    };

    if (moviesFromLocalStorage.length > 0) {
      fetchMoviesDetails(); // Llama a la función solo si hay películas guardadas
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className='lg:mt-20 mt-16'>
        <div className='flex-col mx-auto'>
            <h1 className='text-4xl text-green-600 border-b border-green-600 w-[90%] mx-auto mb-10'>Favorites</h1>

            <div className="mx-auto w-[80%]">
            {movieDetails.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
                {movieDetails.map((movie, index) => (
                    <Link key={index} href={`./single-movie?id=${movie.id}`}>
                    <div  className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h2 className="text-lg font-semibold">{movie.title}</h2>
                        <p className="text-sm">{movie.release_date}</p>
                        <p className="text-sm">Rating: {movie.vote_average}</p>
                    </div>
                    </div>
                    </Link>
                ))}
                </div>
            ) : (
                <p className="text-center text-gray-300">No hay películas guardadas.</p>
            )}
            </div>

        </div>
    </div>
  );
};

export default Favorites;
