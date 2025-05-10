/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import logger from '../../../config/logger'
import { StatusCodes } from 'http-status-codes'
import { updateValid } from './def'
export async function updateValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await updateValid.validateAsync(req.body, { abortEarly: false })
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
