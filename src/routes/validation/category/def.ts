import Joi from 'joi'

export const createValid = Joi.object({
  name: Joi.string().required().trim().strict()
})

export const updateValid = Joi.object({
  name: Joi.string().required().trim().strict()
})
