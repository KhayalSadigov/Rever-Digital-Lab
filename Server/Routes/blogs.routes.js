  const express = require("express");
  const endpoints = require("../Constants/endpoints");
  const blogsController = require("../Controllers/blogs.controller");
  const blogMiddlewares = require("../Middlewares/blogs.middlewares");

  const blogRouter = express.Router();

  blogRouter.get(endpoints.blogs.getAll, blogsController.getAll);
  blogRouter.get(endpoints.blogs.getOne, blogsController.getOne);
  blogRouter.delete(endpoints.blogs.delete, blogsController.delete);
  blogRouter.post(
    endpoints.blogs.post,
    blogMiddlewares.post,
    blogsController.post
  );
  blogRouter.patch(
    endpoints.blogs.patch,
    blogMiddlewares.patch,
    blogsController.patch
  );

  module.exports = blogRouter;
