
import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Function to fetch data from the server
const getData = async () => {
  // const res = await fetch(`${process.env.API_URL}/api/products`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

// Featured component
const Featured = async () => {
  // Fetch featured products data
  const featuredProducts: ProductType[] = await getData();
 

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              {/* Link to product details page (replace with your actual routing logic) */}
              {/* <Link href={`${process.env.API_URL}/product/${item.id}`} className="bg-red-500 text-white p-2 rounded-md"> */}
              <Link href={`${process.env.NEXT_PUBLIC_API_URL}/product/${item.id}`} className="bg-red-500 text-white p-2 rounded-md">
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Featured component
export default Featured;
