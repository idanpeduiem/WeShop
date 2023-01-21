import { Express } from "express";
import cartsRouter from "../routes/carts-router";
import wishListsRouter from "../routes/wish-lists-router";
import ordersRouter from "../routes/orders-router";
import itemsRouter from "../routes/items-router";
import departmentsRouter from "../routes/departments-router";
import categoriesRouter from "../routes/categories-router";

// Add here routes to make all routes uniq
enum routes {
  ITEMS = '/items',
  CARTS = '/carts',
  WISHLISTS = '/wish-lists',
  ORDERS = '/orders',
  DEPARTMENTS = '/departments',
  CATEGORIES = '/categories'
}

const initRoutes = (app: Express) => {
  app.use(routes.ITEMS, itemsRouter);
  app.use(routes.CARTS, cartsRouter);
  app.use(routes.WISHLISTS, wishListsRouter);
  app.use(routes.ORDERS, ordersRouter);
  app.use(routes.DEPARTMENTS, departmentsRouter);
  app.use(routes.CATEGORIES, categoriesRouter);
};

export default initRoutes;
