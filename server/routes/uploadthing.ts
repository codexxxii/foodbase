import { Hono } from "hono";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "../uploadthing";
import { getUser } from "../clerk";

const handlers = createRouteHandler({
  router: uploadRouter,
  config: {},
});

export const uploadthingRoute = new Hono().all("/", getUser, (context) =>
  handlers(context.req.raw),
);
