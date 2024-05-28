import Joi from '@hapi/joi'

import validate from '../utils/validate'

// Validation schema
const schema = Joi.object({
  vendor_ID: Joi.number().label('Vendor').required(),
  company_ID: Joi.number().label('Company').required(),
  bundleDesc: Joi.string().label('Description').required(),
  bundleName: Joi.string().label('Bundle name').required(),
  selectedOfferingIds: Joi.string().label('Offrings').required()
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
