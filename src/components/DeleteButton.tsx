
"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// DeleteButton component
const DeleteButton = ({ id }: { id: string }) => {
  // Get user session and router
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check the loading status
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Check if the user is unauthenticated or not an admin
  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return null; // Render nothing if the user is unauthenticated or not an admin
  }

  // Function to handle product deletion
  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the product
      const res = await fetch(`${process.env.API_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      // Check the response status
      if (res.status === 200) {
        // If successful, redirect to the menu page and show a success toast
        router.push("/menu");
        toast("The product has been deleted!");
      } else {
        // If unsuccessful, show an error toast with the message from the server
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Render the delete button
  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </button>
  );
};

// Export the DeleteButton component
export default DeleteButton;
