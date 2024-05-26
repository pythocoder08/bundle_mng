import Sequelize from 'sequelize'
import connection from '../database/conn'

const VendorCompany = connection.define(
  'VendorCompany', // This is the model name, not the table name
  {
    vendor_ID: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    vendor_company_link: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'tblVendorCompany_Link', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default VendorCompany
