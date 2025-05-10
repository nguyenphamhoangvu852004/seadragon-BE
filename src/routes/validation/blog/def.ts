import Joi from 'joi'

export const createValid = Joi.object({
  userId: Joi.string().required().trim().strict(),
  title: Joi.string().required().trim().strict(),
  body: Joi.string().required().strict()
})

export const updateValid = Joi.object({
  title: Joi.string().required().trim().strict(),
  body: Joi.string().required().strict()
})
