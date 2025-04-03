const express = require("express");
const endpoints = require("../Constants/endpoints");
const portfolioController = require("../Controllers/portfolio.controller");
const portfolioMiddlewares = require("../Middlewares/portfolio.middlewares");

const portfolioRouter = express.Router();

portfolioRouter.get(endpoints.portfolio.getAll, portfolioController.getAll);
portfolioRouter.get(endpoints.portfolio.getOne, portfolioController.getOne);
portfolioRouter.delete(endpoints.portfolio.delete, portfolioController.delete);
portfolioRouter.post(
  endpoints.portfolio.post,
  portfolioMiddlewares.post,
  portfolioController.post
);
portfolioRouter.patch(
  endpoints.portfolio.patch,
  portfolioMiddlewares.patch,
  portfolioController.patch
);

module.exports = portfolioRouter;
