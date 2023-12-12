
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";

// Extend the NextAuth session to include custom properties
declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

// Extend the NextAuth JWT to include custom properties
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  // Use Prisma as the adapter for NextAuth
  adapter: PrismaAdapter(prisma),
  
  // Configure session handling using JWT
  session: {
    strategy: "jwt",
  },

  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  // Define custom callbacks for session and JWT handling
  callbacks: {
    async session({ token, session }) {
      // If a token exists, add the 'isAdmin' property to the user in the session
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      // Fetch user data from the database using the provided email in the JWT
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      // Set the 'isAdmin' property in the JWT based on user data in the database
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
};

// Utility function to get the server session using the defined authentication options
export const getAuthSession = () => getServerSession(authOptions);
