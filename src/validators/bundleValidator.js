import Joi from '@hapi/joi'

import validate from '../utils/validate'

// Validation schema
const schema = Joi.object({
  company_ID: Joi.string().label('Company').required(),
  bundleDesc: Joi.string().label('Description').required(),
  bundleName: Joi.string().label('Bundle name').required(),
  selectedOfferingIds: Joi.string().label('Offrings').required(),
  componentIds : Joi.array().label('Components').required()
})

/**
 * Validate create/update bundle request.
 *
 * @param   {Object}   req
 * @param   {Object}   _
 * @param   {Function} next
 * @returns {Promise}
 */
const bundleValidator = (req, _, next) => {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err))
}

export { bundleValidator }
