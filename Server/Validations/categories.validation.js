const Joi = require("joi");

const categoriesValidation = Joi.object({
  title: Joi.string().max(100).required(),
  src: Joi.string().required(),
});

module.exports = categoriesValidation;
