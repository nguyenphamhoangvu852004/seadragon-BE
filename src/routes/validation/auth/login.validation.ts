/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import logger from '../../../config/logger'
import { StatusCodes } from 'http-status-codes'
export async function loginValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const correctValid = Joi.object({
    email: Joi.string().email().required().trim().strict().min(11),
    password: Joi.string().required().min(6).trim().strict()
  })
  try {
    await correctValid.validateAsync(req.body, { abortEarly: false })
    next()
    return
  } catch (error: any) {
    logger.error(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      errors: error.details.map((err: any) => err.message)
    })
    return
  }
}
