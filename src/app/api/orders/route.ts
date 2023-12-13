
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


// // CORS middleware definition
// const allowCors = (fn: (req: any, res: any) => Promise<void>) => async (req: { method: string }, res: { setHeader: (arg0: string, arg1: string | boolean) => void; status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; }; }) => {
//   // Set CORS headers
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
//   // Handle OPTIONS requests for preflight checks
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   // Call the actual request handler
//   return await fn(req, res);
// }

// // Request handler definition
// const handler = async (req: any, res: { end: (arg0: string) => void }) => {
//   const d = new Date();
//   res.end(d.toString());
// }

// // Export the CORS-wrapped handler
// module.exports = allowCors(handler);

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  // Fetching the user session using the getAuthSession utility function
  const session = await getAuthSession();

  // Checking if the user is authenticated
  if (session) {
    try {
      // Fetching orders based on whether the user is an admin or a regular user
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      } else {
        const orders = await prisma.order.findMany({
          where: {
            userEmail: session.user.email!,
          },
        });
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
    } catch (err) {
      console.log(err);
      // Returning a generic error message in case of a database query error, with a status of 500 (Internal Server Error)
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    // Returning an unauthorized message if the user is not authenticated, with a status of 401 (Unauthorized)
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  // Fetching the user session using the getAuthSession utility function
  const session = await getAuthSession();

  // Checking if the user is authenticated
  if (session) {
    try {
      // Parsing the request body to get order details
      const body = await req.json();

      // Creating a new order in the database
      const order = await prisma.order.create({
        data: body,
      });

      // Returning the created order in the response with a status of 201 (Created)
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      // Returning a generic error message in case of a database creation error, with a status of 500 (Internal Server Error)
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    // Returning an unauthorized message if the user is not authenticated, with a status of 401 (Unauthorized)
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
