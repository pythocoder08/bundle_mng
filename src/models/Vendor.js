import Sequelize from 'sequelize'
import connection from '../database/conn'

const Vendor = connection.define(
  'Vendor', // This is the model name, not the table name
  {
    vendor_ID: {
      type: Sequelize.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    vendor_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'tblVendorProfile', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default Vendor
