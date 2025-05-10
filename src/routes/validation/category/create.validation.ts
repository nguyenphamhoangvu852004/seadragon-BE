/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import logger from '../../../config/logger'
import { StatusCodes } from 'http-status-codes'
export async function createValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const correctValid = Joi.object({
      name: Joi.string().required().trim().strict()
    })
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
