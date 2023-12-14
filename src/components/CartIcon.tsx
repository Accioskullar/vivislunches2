
"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

// CartIcon component
const CartIcon = () => {
  // Get the session status and data using the useSession hook
  const { data: session, status } = useSession();

  // Get the totalItems from the cart store using the useCartStore hook
  const { totalItems } = useCartStore();

  // // Rehydrate the cart store on component mount and re-renders
  // useEffect(() => {
  //   useCartStore.persist.rehydrate();
  // }, []);

  // Render the CartIcon component
  return (
    <Link href="/cart">
      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <div className="relative w-8 h-8 md:w-5 md:h-5">
          <Image
            src="/cart.png"
            alt=""
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        {/* Display the total number of items in the cart */}
        <span>Carrito({totalItems})</span>
      </div>
    </Link>
  );
};

// Export the CartIcon
export default CartIcon;