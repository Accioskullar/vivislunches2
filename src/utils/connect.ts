
import { PrismaClient } from '@prisma/client';

// Create a global variable for Prisma to ensure a single instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma using the existing instance or create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// If not in production, store the Prisma instance in the global variable
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
