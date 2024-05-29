import Sequelize from 'sequelize'
import connection from '../database/conn'

const CompanyProfile = connection.define(
  'CompanyProfile', // This is the model name, not the table name
  {
    Company_LogID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Vendor_ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Company: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'tblCompanyProfile', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default CompanyProfile
