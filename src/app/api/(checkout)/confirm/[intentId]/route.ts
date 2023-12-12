// @ts-nocheck
import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

// Handling PUT requests for updating an order's status
// @ts-ignore
export const PUT : NextRequest | Request = async ({ params }: { params: { intentId: string } }) => {
  // Extracting intentId from request parameters
  const { intentId } = params;

  try {
    // Updating the order in the database with the new status ("Being prepared!")
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });

    // Responding with a success message
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    // Handling errors and responding with an error message
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
