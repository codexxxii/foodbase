import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Tables
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  clerk_id: text("clerk_id").unique().notNull(),
});

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image_url: text("image_url").notNull(),
  prep_time: text("prep_time").notNull(),
  cook_time: text("cook_time").notNull(),
  servings: text("servings").notNull(),
  category: text("category").notNull(),
});

export const instructions = pgTable("instructions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  recipe_id: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  instruction: text("instruction").notNull(),
});

export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  recipe_id: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  amount: text("amount").notNull(),
  ingredient: text("ingredient").notNull(),
});

export const favorites = pgTable("favorites", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
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

// Relations
export const userRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  user: one(users, { fields: [recipes.user_id], references: [users.clerk_id] }),
  instructions: many(instructions),
  ingredients: many(ingredients),
}));

export const instructionRelations = relations(instructions, ({ one }) => ({
  recipe: one(recipes, {
    fields: [instructions.recipe_id],
    references: [recipes.id],
  }),
}));

export const ingredientRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipe_id],
    references: [recipes.id],
  }),
}));

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

// Types
export const RecipeSchema = createInsertSchema(recipes);
export const ingredientsSchema = createInsertSchema(ingredients);
export const instructionsSchema = createInsertSchema(instructions);
export const createFavoriteSchema = createInsertSchema(favorites);
