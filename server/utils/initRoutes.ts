import { Express } from "express";
import { mongoDbManager } from "./mongoDbManager";
import { validateToken } from "./middlewares";
import cartsRouter from "../routes/carts-router";
import wishListsRouter from "../routes/wish-lists-router";
import ordersRouter from "../routes/orders-router";
import itemsRouter from "../routes/items-router";

// Add here routes to make all routes uniq
enum routes {
  ITEMS = '/items',
  CARTS = '/carts',
  WISHLISTS = '/wish-lists',
  ORDERS = '/orders'
}

const initRoutes = (app: Express) => {
  app.use(routes.ITEMS, itemsRouter);
  app.use(routes.CARTS, cartsRouter);
  app.use(routes.WISHLISTS, wishListsRouter);
  app.use(routes.ORDERS, ordersRouter);
};

export default initRoutes;
