const Joi = require("joi");

const blogsValidation = Joi.object({
  title: Joi.string().required().min(3).max(150),
  description: Joi.string().required(),
  cover: Joi.string().required(),
  owner: Joi.string(),
  ownerId: Joi.number(),
});

module.exports = blogsValidation;
