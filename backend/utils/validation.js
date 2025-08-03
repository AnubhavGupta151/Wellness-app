const Joi = require('joi');

const validateSessionInput = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().max(500),
    duration: Joi.number().integer().min(1).max(240),
    status: Joi.string().valid('draft', 'published')
  });

  return schema.validate(data, { abortEarly: false });
};

const validateUserInput = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().max(50)
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateSessionInput,
  validateUserInput
};