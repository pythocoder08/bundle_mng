import Joi from '@hapi/joi'

import validate from '../utils/validate'

// Validation schema
const schema = Joi.object({
  email: Joi.string().label('email').email().max(90).required(),
  password: Joi.string().label('password').max(90).required()
})

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   _
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, _, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err))
}

export { userValidator }
