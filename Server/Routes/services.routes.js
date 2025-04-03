const express = require("express");
const endpoints = require("../Constants/endpoints");
const servicesController = require("../Controllers/services.controller");
const servicesMiddleware = require("../Middlewares/services.middlewares");

const serviceRouter = express.Router();

serviceRouter.get(endpoints.services.getAll, servicesController.getAll);
serviceRouter.get(endpoints.services.getOne, servicesController.getOne);
serviceRouter.delete(endpoints.services.delete, servicesController.delete);
serviceRouter.post(
  endpoints.services.post,
  servicesMiddleware.post,
  servicesController.post
);
serviceRouter.patch(
  endpoints.services.patch,
  servicesMiddleware.patch,
  servicesController.patch
);

module.exports = serviceRouter;
