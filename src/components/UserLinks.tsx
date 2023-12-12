
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// Define the UserLinks component
const UserLinks = () => {
  // Use the useSession hook to get the authentication status
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        // If authenticated, render links for orders and logout
        <div>
          <Link href="/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>Logout</span>
        </div>
      ) : (
        // If not authenticated, render a link to the login page
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

// Export the UserLinks component
export default UserLinks;
