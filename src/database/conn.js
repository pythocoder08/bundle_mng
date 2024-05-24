import { Sequelize } from 'sequelize'

import config from '../config/config'

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, dialect } = config

const dbConfig = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  dialect: dialect,
  dialectOptions: {
    options: {
      encrypt: true, // This is mandatory for Azure SQL Database
      trustServerCertificate: true // Change to true if you have problems with certificate
    }
  }
}

const connection = new Sequelize(dbConfig)

export default connection
