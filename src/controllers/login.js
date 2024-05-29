import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'

import config from '../config/config'
import passwordUtil from '../utils/password'
import UserService from '../services/UserService'
import VendorService from '../services/VendorService'

/**
 * Login
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const { userID, password } = req.body

    const user = await UserService.fetchUserByUserID(userID)

    if (!passwordUtil.comparePassword(password, user.password)) 
      throw Boom.badRequest('Password incorrect')

    const token = jwt.sign({ user: { userID: user.userID } }, config.SECRET, {
      expiresIn: config.expiresIn
    })

    res.json({ user, token })
  } catch (err) {
    next(err)
  }
}
