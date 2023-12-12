
import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

// Define the AddressForm component
const AddressForm = () => {
  return (
    <form>
      {/* Display a heading for the address section */}
      <h3>Address</h3>
      {/* Use the AddressElement from Stripe */}
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          // Handle the address change event
          if (event.complete) {
            const address = event.value.address;
            // Perform any actions with the complete address information
          }
        }}
      />
    </form>
  );
};

// Export the AddressForm component
export default AddressForm;
