const express = require("express");
const endpoints = require("../Constants/endpoints");
const categoryMiddleware = require("../Middlewares/categories.middlewares");
const categoriesController = require("../Controllers/categories.controller");

const categoryRouter = express.Router();

categoryRouter.get(endpoints.categories.getAll, categoriesController.getAll);
categoryRouter.get(endpoints.categories.getOne, categoriesController.getOne);
categoryRouter.delete(endpoints.categories.delete, categoriesController.delete);
categoryRouter.post(
  endpoints.categories.post,
  categoryMiddleware.post,
  categoriesController.post
);
categoryRouter.patch(
  endpoints.categories.patch,
  categoryMiddleware.patch,
  categoriesController.patch
);

module.exports = categoryRouter;
