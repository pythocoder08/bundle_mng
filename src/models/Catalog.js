import Sequelize from 'sequelize'
import connection from '../database/conn'

const Catalog = connection.define(
  'Catalog', // This is the model name, not the table name
  {
    catalogID: {
      type: Sequelize.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    catalog: {
      type: Sequelize.STRING
    },
    catalog_dateAdded: {
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    },
    logID: {
      type: Sequelize.STRING,
      autoIncrement: true
    }
  },
  {
    tableName: 'tblCatalog', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default Catalog
