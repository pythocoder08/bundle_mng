import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'

import config from '../config/config'
import passwordUtil from '../utils/password'
import UserService from '../services/UserService'

/**
 * Login
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await UserService.fetchUserByEmail(email)

    if (!passwordUtil.comparePassword(password, user.password)) throw Boom.badRequest('Password incorrect')

    const token = jwt.sign({ user: { email: user.email } }, config.SECRET, {
      expiresIn: config.expiresIn
    })

    res.json({ user, token })
  } catch (err) {
    next(err)
  }
}
