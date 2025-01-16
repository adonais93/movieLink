'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardCarrusel from './cardCarrusel';

const Carrusel = ({ carruselMovies = [] }) => {
    
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    swipe: true,
    responsive: [
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {carruselMovies.length > 0 ? (
        <Slider {...settings}>
          {carruselMovies.map((item, index) => (
            <CardCarrusel key={index} item={item} />
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 text-center">No movies available for the carousel.</p>
      )}
    </>
  );
};

export default Carrusel;
