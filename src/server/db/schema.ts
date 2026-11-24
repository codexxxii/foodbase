import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

// Users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  clerk_id: text("clerk_id").unique().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  ingredients: many(ingredients),
}));

export const createUserSchema = createInsertSchema(users);

// Recipes
export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  image_url: text("image_url").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  servings: text("servings").notNull(),
  prep_time: text("prep_time").notNull(),
  cook_time: text("cook_time").notNull(),
  instructions: text("instructions").array().notNull(),
});

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  user: one(users, { fields: [recipes.user_id], references: [users.clerk_id] }),
  ingredients: many(ingredients),
}));

export const createRecipeSchema = createInsertSchema(recipes);

// Ingredients
export const ingredients = pgTable("ingredients", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("uesr_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  recipe_id: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  amount: text("amount").notNull(),
  ingredient: text("ingredient").notNull(),
});

export const ingredientRelations = relations(ingredients, ({ one }) => ({
  user: one(users, {
    fields: [ingredients.user_id],
    references: [users.clerk_id],
  }),
  recipe: one(recipes, {
    fields: [ingredients.recipe_id],
    references: [recipes.id],
  }),
}));

export const createIngredientSchema = createInsertSchema(ingredients);

// Favorites
export const favorites = pgTable("favorites", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  recipe_id: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
});

export const favoriteRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.user_id],
    references: [users.clerk_id],
  }),
  recipe: one(recipes, {
    fields: [favorites.recipe_id],
    references: [recipes.id],
  }),
}));

export const createFavoriteSchema = createInsertSchema(favorites);
