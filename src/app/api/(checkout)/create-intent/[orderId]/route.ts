
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Handling POST requests for creating a payment intent
export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  // Extracting orderId from request parameters
  const { orderId } = params;

  // Fetching the order details from the database using Prisma
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  // Checking if the order exists
  if (order) {
    // Calculating the amount in cents (Stripe uses the smallest currency unit)
    const amountInCents = order.price.times(100).toNumber();

    // Creating a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Updating the order in the database with the payment intent ID
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    // Responding with the client secret of the payment intent
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }

  // Responding with an error message if the order is not found
  return new NextResponse(
    JSON.stringify({ message: "Order not found!" }),
    { status: 404 }
  );
}
