import Boom from '@hapi/boom'
import { Op } from 'sequelize'
import User from '../models/User'

export default class UserService {
  /**
   * Get a user by email or user ID.
   *
   * @param   {String}  flag
   * @returns {Promise<User|null>}
   */
  static async fetchUserByUserID(userID) {
    try {
      const user = await User.findOne({where: { UserID: userID }})

      if (!user) throw Boom.notFound('User not found')

      return user
    } catch (err) {
      throw err
    }
  }
}
