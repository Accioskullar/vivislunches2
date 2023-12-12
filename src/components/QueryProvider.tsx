
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Define the props for the QueryProvider component
type Props = {
  children: React.ReactNode;
};

// QueryProvider component
const QueryProvider = ({ children }: Props) => {
  // Render the QueryClientProvider with the created query client and the provided children
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Export the QueryProvider component
export default QueryProvider;
