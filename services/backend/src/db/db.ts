// services/backend/src/db/db.ts

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Ensure we have a database connection string before initializing
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL environment variable is missing!");
}

// Disable logging in production to keep logs clean, enable in development
const loggerOptions = process.env.NODE_ENV !== "production";

// Initialize the reactive postgres-js client
const queryClient = postgres(databaseUrl);

// Export the strongly-typed Drizzle ORM instance
export const db = drizzle(queryClient, { schema, logger: loggerOptions });
