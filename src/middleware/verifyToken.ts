import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/enviroment'
import { log } from 'console'

export function verifyToken() {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.split(' ')[1]
      if (!token) {
        throw new Error('Token not found')
      }

      // lấy trong payload ra
      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET as string)
      log('decoded', decoded)
      req.user = decoded

      next()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      res.status(401).json({ status: 401, message })
      return
    }
  }
}