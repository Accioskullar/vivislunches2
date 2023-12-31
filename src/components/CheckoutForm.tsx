
"use client";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

// CheckoutForm component
const CheckoutForm = () => {
  // Get the stripe and elements objects using hooks
  const stripe = useStripe();
  const elements = useElements();

  // State for email, message, and loading status
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to handle payment status
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // Confirm the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: `${process.env.API_URL}/success`,
        return_url: `${process.env.NEXT_PUBLIC_API_URL}/success`,
      },
    });

    // Handle any errors during payment confirmation
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Something went wrong!");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  // Render the checkout form
  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      {/* Stripe Link Authentication Element */}
      <LinkAuthenticationElement id="link-authentication-element" />
      {/* Stripe Payment Element */}
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      {/* Address Form Component */}
      <AddressForm />
      {/* Pay Now Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-red-500 text-white p-4 rounded-md w-28"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

// Export the CheckoutForm component
export default CheckoutForm;
