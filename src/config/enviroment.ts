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

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}






