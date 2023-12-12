
"use client";
import { SessionProvider } from "next-auth/react";

// Define the AuthProvider component
type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // Return the SessionProvider wrapping the children
  return <SessionProvider>{children}</SessionProvider>;
};

// Export the AuthProvider component
export default AuthProvider;
