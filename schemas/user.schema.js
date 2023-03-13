const Joi = require("joi");

const id = Joi.string().uuid();
const email = Joi.string().alphanum().min(3).max(45);
const password = Joi.string().alphanum().min(3).max(45);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  email: email,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};
