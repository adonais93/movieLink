'use client'
import { useEffect,useState } from 'react';
import Movies from "./component/movies";
import Navbar from "./component/navbar";


export default function Home() {

  
  return (
    <>
    <Navbar/>
    <div className="w-[80%] mt-20 flex justify-center items-center mx-auto">
      <Movies />
    </div>
    </>
  );
}
