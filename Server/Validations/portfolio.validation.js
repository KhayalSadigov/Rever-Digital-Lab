const Joi = require("joi");

const portfolioValidation = Joi.object({
  title: Joi.string().max(150).required(),
  src: Joi.string().required(),
  cover: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = portfolioValidation;
