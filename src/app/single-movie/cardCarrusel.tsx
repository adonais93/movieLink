const CardCarrusel = ({ item, index }) => {


  return (
    <div className='m-2'>
      <div
        key={index}
        className="w-full  h-200 lg:transform lg:transition-transform lg:hover:scale-105 mx-2 mb-10 relative group "
      >
        <a href={`/single-movie?id=${item.id}`}>
        <div
            className="h-[50px] md:h-[150px] lg:h-[180px] w-full bg-yellow-100 bg-cover bg-center"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/w500${item.backdrop_path}")`,
            }}
            ></div>

          <div className="p-1 relative space-y-2">
            <h3 className="uppercase text-md text-green-600 font-bold text-center mt-2">{item.title}</h3>
            <p className="text-gray-100 text-xs">{item.overview}</p>
            
          </div>
        </a>
      </div>
    </div>
  );
};

export default CardCarrusel;