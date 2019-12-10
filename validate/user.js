const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": `"username" should be a type of 'text'`,
      "string.empty": `"username" cannot be an empty field`,
      "any.required": `"username" is a required field`
    }),
  password: Joi.string()
    .required()
    .min(3)
    .messages({
      "string.min": `"pass" should have a minimum length of {#limit}`,
      "string.base": `"pass" should be a type of 'text'`,
      "string.empty": `"pass" cannot be an empty field`,
      "any.required": `"pass" is a required field`,
    }),
})

const loginValidate = data => loginSchema.validate({ ...data });

export default {
  loginValidate
}