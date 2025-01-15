'use client';
import Movies from './component/movies';


export default function Home() {
  return (
    <>
      
      <div className="w-[80%] mt-20 flex justify-center items-center mx-auto">
        <Movies />
      </div>
    </>
  );
}
