const Joi = require("joi");

const blogsValidation = Joi.object({
  title: Joi.string().required().min(3).max(150),
  content: Joi.string().required(),
  createDate: Joi.string().required(),
  likes: Joi.number().required(),
  categoryId: Joi.string(),
  cover: Joi.string(),
  owner: Joi.string(),
  ownerId: Joi.number(),
});

module.exports = blogsValidation;
