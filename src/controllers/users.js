import Boom from '@hapi/boom'

import UserService from '../services/UserService'

export const fetchMe = async (req, res, _) => {
  res.json({ user: req.user })
}
