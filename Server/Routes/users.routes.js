const express = require("express");
const endpoints = require("../Constants/endpoints");
const usersController = require("../Controllers/users.controller");
const userMiddlewares = require("../Middlewares/users.middlewares");

const usersRouter = express.Router();

usersRouter.get(endpoints.users.getAll, usersController.getAll);
usersRouter.post(endpoints.users.login, usersController.login);
usersRouter.post(endpoints.users.loginCheck, usersController.loginCheck);
usersRouter.get(endpoints.users.getOne, usersController.getOne);
usersRouter.delete(endpoints.users.delete, usersController.delete);
usersRouter.post(
  endpoints.users.post,
  userMiddlewares.post,
  usersController.post
);
userMiddlewares.post,
  usersRouter.patch(
    endpoints.users.patch,
    userMiddlewares.patch,
    usersController.patch
  );

module.exports = usersRouter;
