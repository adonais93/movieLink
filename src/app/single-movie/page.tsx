/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import Carrusel from './carrusel';
import tmdb from '../../../utils/tmdbs';
import Image from 'next/image';

export default function SingleMovie() {
  const [singleMovieId, setSingleMovieId] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [carruselMovies, setCarruselMovies] = useState([]);

  // Obtener `id` de los parámetros de la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const movieId = queryParams.get('id');
    console.log('Movie ID:', movieId);
    if (movieId) {
      setSingleMovieId(movieId);
    }
  }, []);

  // Fetch de detalles de la película
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!singleMovieId) return;

      try {
        const response = await tmdb.get(`/movie/${singleMovieId}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [singleMovieId]);

  // Fetch de películas populares para el carrusel
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdb.get('/movie/popular');
        setCarruselMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  const saveMovieToLocalStorage = (movieId) => {
    try {
      // Verificar si ya existe algún dato en el localStorage
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  
      // Verificar si la película ya está guardada
      if (!savedMovies.includes(movieId)) {
        savedMovies.push(movieId); // Agregar el ID al arreglo
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies)); // Guardar en el localStorage
        window.alert(`Película con ID ${movieId} guardada en el localStorage.`);
      } else {
        window.alert(`La película con ID ${movieId} ya está guardada.`);
      }
    } catch (error) {
      console.error('Error al guardar la película en el localStorage:', error);
    }
  };
  
  return (
    <>
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

      <div className="mt-5 p-5">
        <div className="border-b border-green-400">
          <h1 className="mt-3 text-gray-500 uppercase font-bold text-lg">Recommended</h1>
        </div>

        <div className="w-[90%] p-4 mx-auto">
          <Carrusel carruselMovies={carruselMovies} />
        </div>
      </div>
    </>
  );
}
