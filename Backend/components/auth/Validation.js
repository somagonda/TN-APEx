const Joi = require("joi");

const registrationSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required(),
  city: Joi.string().min(3).max(50).required(),
  profession: Joi.string().min(3).max(50).required(),
});

module.exports = registrationSchema;
