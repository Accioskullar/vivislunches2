
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Static data for the slides
const data = [
  {
    id: 1,
    title: "Siempre fresco, siempre caliente",
    image: "/slide1.jpg",
  },
  {
    id: 2,
    title: "Entregamos en toda la area metro!",
    image: "/carnefrita.jpg",
  },
  {
    id: 3,
    title: "El mejor tipo de comida hecha en casa",
    image: "/slide4.jpg",
  },
];

// Slider component
const Slider = () => {
  // State to keep track of the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically switch slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  // Render the slider component
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-red-500 text-white py-4 px-8">Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        {/* Display the current slide image */}
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

// Export the Slider component
export default Slider;
