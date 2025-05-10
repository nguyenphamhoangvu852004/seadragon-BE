import Joi from 'joi'

export const createValid = Joi.object({
  fullname: Joi.string().required().trim().strict(),
  email: Joi.string().required().email().trim().strict(),
  address: Joi.string().required().trim().strict(),
  phoneNumber: Joi.string().required().trim().strict()
})

export const updateValid = Joi.object({
  title: Joi.string().required().trim().strict(),
  description: Joi.string().required().trim().strict(),
  price: Joi.string().required().strict().max(99999999).min(1),
  categoryId: Joi.string().required()
})
