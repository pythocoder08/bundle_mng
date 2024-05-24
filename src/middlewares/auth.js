import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'

import config from './../config/config'
import UserService from '../services/UserService'
import { ADMIN, USER } from '../config/constants'

const auth =
  (role = USER) =>
  async (req, _, next) => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) throw Boom.unauthorized('No token provided, authorization denied')

      if (!authHeader.startsWith('Bearer ')) throw Boom.unauthorized('Invalid token format')

      const token = authHeader.split(' ')[1]

      const {
        user: { email }
      } = jwt.verify(token, config.SECRET)

      const user = await UserService.fetchUserByEmail(email)

      if (role === ADMIN) if (user.vendor !== 'Yes') throw Boom.forbidden('Permission denied')

      req.user = user

      next()
    } catch (err) {
      next(err)
    }
  }

export default auth
