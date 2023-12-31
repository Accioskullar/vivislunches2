
import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

// Function to fetch menu data
const getData = async () => {
  // const res = await fetch(`${process.env.API_URL}/api/categories`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: "no-store",
  });
  // const res = await fetch("http://localhost:3000/api/categories", {
  //   cache: "no-store",
  // });


  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

// Define the MenuPage component
const MenuPage = async () => {
  // Fetch menu data
  const menu: MenuType = await getData();
 

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>
            <button className={`hidden 2xl:block bg-${category.color} text-${category.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md`}>
              Explorar
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Export the MenuPage component
export default MenuPage;
