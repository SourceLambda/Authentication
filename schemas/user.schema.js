const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(45);
const price = Joi.number().integer().min(10);

const createUserSchema = Joi.object({
  name: name.required(),
  price: price.required()
});

const updateUserSchema = Joi.object({
  name: name,
  price: price
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};
