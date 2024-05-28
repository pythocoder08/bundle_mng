import Sequelize from 'sequelize'
import connection from '../database/conn'

const Tooltip = connection.define(
  'Tooltip', // This is the model name, not the table name
  {
    log_ID: {
      type: Sequelize.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    learn_more: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'tblToolTips', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default Tooltip
