import { Hono } from "hono";
import { logger } from "hono/logger";
import { clerkMiddleware } from "@clerk/hono";
import { authRoute } from "./routes/auth";
import { recipesRoute } from "./routes/recipes";
import { uploadthingRoute } from "./routes/uploadthing";
import { favoritesRoute } from "./routes/favorites";

const app = new Hono();

app.use("*", logger());
app.use("*", clerkMiddleware());

const apiRoutes = app
  .basePath("/api")
  .route("/", authRoute)
  .route("/uploadthing", uploadthingRoute)
  .route("/recipes", recipesRoute)
  .route("/favorites", favoritesRoute);

export type ApiRoutes = typeof apiRoutes;
export default app;
