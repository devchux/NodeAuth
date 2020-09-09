const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  };

  return Joi.validate(data, schema);
};

module.exports = registerValidation;
