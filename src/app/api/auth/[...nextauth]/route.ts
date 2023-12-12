
import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth/next";

// Creating a handler for NextAuth by passing the authentication options
const handler = NextAuth(authOptions);

// Exporting the handler for both GET and POST requests
// Note: NextAuth is often used for handling authentication-related requests, and it internally supports both GET and POST methods.
// By exporting the same handler for both, it allows NextAuth to handle both types of requests.
export { handler as GET, handler as POST };
