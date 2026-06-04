// services/backend/src/db/validation.ts

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "@hono/zod-openapi"; // Important: use z from @hono/zod-openapi for correct metadata binding
import { categories, menuItems, customers, orders } from "./schema";

// =========================================================================
// 📐 Database Generated Schemas (with OpenAPI Metadata Extension)
// =========================================================================

// Categories Schemas
export const selectCategorySchema =
  createSelectSchema(categories).openapi("Category");
export const insertCategorySchema = createInsertSchema(categories, {
  id: (schema) => schema.optional(),
  name: (schema) => schema.min(2, "Name must be at least 2 characters long"),
  slug: (schema) =>
    schema.regex(/^[a-z0-9-]+$/, "Slug must be alphanumeric and kebab-case"),
}).openapi("InsertCategory");

// Menu Items Schemas
export const selectMenuItemSchema =
  createSelectSchema(menuItems).openapi("MenuItem");
export const insertMenuItemSchema = createInsertSchema(menuItems, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters long"),
  price: (schema) =>
    schema.regex(
      /^\d+(\.\d{1,2})?$/,
      'Price must be a valid monetary decimal string (e.g., "12.50")',
    ),
}).openapi("InsertMenuItem");

// Standard Error Response Schema for OpenAPI docs consistency
export const errorResponseSchema = z
  .object({
    success: z.boolean().openapi({ example: false }),
    message: z.string().openapi({ example: "An unexpected error occurred" }),
  })
  .openapi("ErrorResponse");
