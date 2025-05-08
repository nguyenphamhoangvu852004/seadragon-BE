import dotenv from 'dotenv'
dotenv.config()
export const env = {
  PORT: Number(process.env.PORT),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_SYNC: process.env.DB_SYNCHRONIZE,
  DB_LOGGING: process.env.DB_LOGGING,
  CORS_ORIGIN: process.env.CORS_ORIGIN,

  INIT_ADMIN_USERNAME: process.env.INITIAL_ADMIN_USERNAME,
  INIT_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL,
  INIT_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
  REFRESH_TOKEN_EXPIRES_IN: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: Number(process.env.MAIL_PORT),
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_ADMIN_RECEIVER: process.env.MAIL_ADMIN_RECEIVER
}

