import nodemailer from 'nodemailer'
import { env } from './enviroment'

export const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: false,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
})
