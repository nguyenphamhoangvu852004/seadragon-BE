import 'dotenv/config'

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

  INIT_ADMIN_USERNAME: process.env.INITIAL_ADMIN_USERNAME as string,
  INIT_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL as string,
  INIT_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD as string,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string
}
