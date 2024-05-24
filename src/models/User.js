// import connection from '../database/config'
// import Sequelize from 'sequelize'

// const User = connection.define(
//   'User',
//   {
//     Customer_ID: {
//       type: Sequelize.NUMBER,
//       allowNull: false
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     Vendor: {
//       type: Sequelize.BOOLEAN,
//       allowNull: true
//     }
//   },
//   {
//     modelName: 'dbo.tblUser',
//     timestamps: false
//   }
// )

// export default User

import Sequelize from 'sequelize'
import connection from '../database/conn'

const User = connection.define(
  'User', // This is the model name, not the table name
  {
    userID: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vendor: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'tblUser', // Specify the actual table name here
    schema: 'dbo', // Specify the schema name here
    timestamps: false, // Set to false if you don't have timestamp columns like createdAt and updatedAt
    freezeTableName: true // Prevents Sequelize from renaming the table to plural
  }
)

export default User
