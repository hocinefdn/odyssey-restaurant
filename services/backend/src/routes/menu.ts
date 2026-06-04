// services/backend/src/routes/menu.ts

import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import {
  insertCategorySchema,
  selectCategorySchema,
  insertMenuItemSchema,
  selectMenuItemSchema,
  errorResponseSchema,
} from "../db/validation";

import { categories, menuItems } from "../db/schema";
import { db } from "../db/db";

type CategoryResponse = z.infer<typeof selectCategorySchema>;
type MenuItemResponse = z.infer<typeof selectMenuItemSchema>;

// Initialize the router engine
const menuRouter = new OpenAPIHono();

// =========================================================================
// 🗺️ API Route Definitions (OpenAPI Contracts)
// =========================================================================

const listCategoriesRoute = createRoute({
  method: "get",
  path: "/categories",
  summary: "Retrieve all menu categories",
  responses: {
    200: {
      content: {
        "application/json": { schema: z.array(selectCategorySchema) },
      },
      description: "List of all active restaurant categories",
    },
  },
});

const createCategoryRoute = createRoute({
  method: "post",
  path: "/categories",
  summary: "Create a new menu category",
  request: {
    body: { content: { "application/json": { schema: insertCategorySchema } } },
  },
  responses: {
    201: {
      content: { "application/json": { schema: selectCategorySchema } },
      description: "The category was successfully created",
    },
    400: {
      content: { "application/json": { schema: errorResponseSchema } },
      description: "Invalid input parameters supplied",
    },
  },
});

const listMenuItemsRoute = createRoute({
  method: "get",
  path: "/items",
  summary: "Retrieve all menu items",
  responses: {
    200: {
      content: {
        "application/json": { schema: z.array(selectMenuItemSchema) },
      },
      description: "List of all available dishes and items",
    },
  },
});
// =========================================================================
// 🛠️ Route Handlers (Connected to Live PostgreSQL Database)
// =========================================================================

// GET: Retrieve all categories from PostgreSQL
menuRouter.openapi(listCategoriesRoute, async (c) => {
  try {
    const allCategories = await db.select().from(categories);

    // Explicitly map database results to match the OpenAPI component schema layout
    const formattedCategories: CategoryResponse[] = allCategories.map(
      (cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      }),
    );

    return c.json(formattedCategories, 200);
  } catch (error: any) {
    console.error("Failed to fetch categories:", error);
    // Return empty array matching contract signature on unexpected database faults
    return c.json([], 200);
  }
});

// POST: Insère une nouvelle catégorie dans PostgreSQL
menuRouter.openapi(createCategoryRoute, async (c) => {
  try {
    const data = c.req.valid("json");
    const newId = data.id || `cat_${Date.now()}`;

    const [insertedCategory] = await db
      .insert(categories)
      .values({
        id: newId,
        name: data.name,
        slug: data.slug,
      })
      .returning();

    return c.json(insertedCategory, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
});

// GET: Récupère tous les plats depuis PostgreSQL
// menuRouter.openapi(listMenuItemsRoute, async (c) => {
//   try {
//     const allItems = await db.select().from(menuItems);
//     return c.json(allItems, 200);
//   } catch (error: any) {
//     return c.json({ success: false, message: error.message }, 400);
//   }
// });
export default menuRouter;
