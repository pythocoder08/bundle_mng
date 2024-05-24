import dotenv from 'dotenv'

dotenv.config()

export default {
  NODE_ENV: process.env.NODE_ENV || 'DEV',
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || '8080',
  SECRET: process.env.SECRET || 'secret',
  dialect: 'mssql',
  expiresIn: process.env.EXPIRESIN || '24h',
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  //DB config
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '1433',
  DB_USER: process.env.DB_USER || 'sa',
  DB_PASS: process.env.DB_PASS || 'secret',
  DB_NAME: process.env.DB_NAME || 'PRoduct_Deets'
}
