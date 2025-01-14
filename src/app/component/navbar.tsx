'use client'
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para realizar la búsqueda
    console.log(searchTerm);
  };

  return (
    <nav className="fixed top-0 flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <span className="ms-2 text-xl text-black dark:text-white uppercase">Navbar</span>

        <div className="ms-5 flex items-center justify-between sm:hidden md:hidden lg:block">
          <form onSubmit={handleSearch} className="w-full flex">
            <input
              type="search"
              className="relative m-0 block flex-auto rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              href={`/search?query=${searchTerm}`}
              className="ml-3 text-gray-600 dark:text-white"
            >
              <span
                className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white [&>svg]:w-5"
                id="basic-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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

        <div className="lg:hidden">
          <button onClick={toggleModal} aria-label="Open search modal">
            <span
              className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white [&>svg]:w-5"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
              <form onSubmit={handleSearch} className="flex flex-col items-center">
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
                  className="relative top-2 right-2 text-gray-600 dark:text-white"
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
