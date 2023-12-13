"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

// Load the Stripe API key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// React component definition
const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          // `${process.env.API_URL}api/create-intent/${id}`,
          `${process.env.NEXT_PUBLIC_API_URL}/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [id]);

  const options:StripeElementsOptions={
    clientSecret,
    appearance:{
      theme:"stripe"
    }
  }
   // Render the payment form using the CheckoutForm component
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;