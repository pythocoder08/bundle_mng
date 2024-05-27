import Sequelize from 'sequelize'
import connection from '../database/conn'

const Bundle = connection.define(
  'Bundle', // This is the model name, not the table name
  {
    bundle_ID: {
      type: Sequelize.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    bundle_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bundle_desc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vendor_ID: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'tblBundles', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default Bundle
