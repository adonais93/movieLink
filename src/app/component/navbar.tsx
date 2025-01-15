'use client';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevenir la redirección predeterminada del formulario

    // Verificar si el campo de búsqueda está vacío
    if (!searchTerm.trim()) {
      alert("Por favor ingresa un término de búsqueda.");
      return; // No continuar con la búsqueda si el término está vacío
    }
  
    // Si el término de búsqueda no está vacío, proceder con la redirección
    // Aquí se puede ejecutar la redirección o cualquier acción relacionada con la búsqueda
    window.location.href = `/search?query=${searchTerm}`;
    console.log(searchTerm);
  };

  return (
    <nav className="fixed z-50 top-0 flex w-full  items-center justify-center bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 mx-auto lg:px-5">
      <div className="flex w-full items-center  px-3 mx-auto">
      <Link href="/" className="flex w-full ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="ml-2 text-xl font-semibold">MovieLink</span>
      </Link>
        
      <div className="justify-end lg:block items-center w-full">
          {/* Para pantallas grandes (lg) */}
          <div className="hidden lg:flex  space-x-6 items-center justify-end">
            <Link href="/favorites" className="text-md text-black  hover:text-green-400 uppercase">
              Favorites
            </Link>

            <form onSubmit={handleSearch} className="flex w-2/3">
              <input
                type="search"
                className="relative m-0 block flex-auto rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                placeholder="Search Movie"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
              <Link
                href={`/search?query=${searchTerm}`}
                className="ml-3 text-gray-600 dark:text-white"
              >
                <span className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white [&>svg]:w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>
            </form>
          </div>

          {/* Para pantallas pequeñas (lg:hidden) */}
          <div className="lg:hidden flex w-full space-x-2 items-center justify-end pr-4">
            <Link href="/favorites">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </Link>

            <button onClick={toggleModal} aria-label="Open search modal">
              <span className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white [&>svg]:w-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
      </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
              <form
                onSubmit={handleSearch}
                className="flex flex-col items-center"
              >
                <input
                  type="search"
                  className="relative w-full rounded border border-solid border-secondary-500 bg-transparent px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Buscar"
                />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Buscar
                </button>
                <button
                  onClick={toggleModal}
                  className="adsolute justify-start text-gray-600 dark:text-white flex"
                  aria-label="Close search modal"
                >
                  <p>close</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a1 1 0 01-.707-.293L5.586 5.586a1 1 0 011.414-1.414l3.707 3.707 3.707-3.707a1 1 0 111.414 1.414l-3.707 3.707A1 1 0 0110 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
