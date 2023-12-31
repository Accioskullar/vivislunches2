"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

// React component definition
const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        // await fetch(`${process.env.API_URL}/api/confirm/${payment_intent}`, {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router]);
  
  // Render the success message and redirection notice
  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Pago recibido! Usted esta siendo dirigido a la pagina de ordenes.
          Por favor no cierre esta pagina.
        </p>
      
      </div>
    </>
  );
};

export default SuccessPage;