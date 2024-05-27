import Joi from '@hapi/joi'

import validate from '../utils/validate'

// Validation schema
const schema = Joi.object({
  vendor_ID: Joi.number().label('vendor_ID').required(),
  company_ID: Joi.number().label('company_ID').required(),
  bundleDesc: Joi.string().label('bundleDesc').required(),
  bundleName: Joi.string().label('bundleName').required(),
  selectedOfferingIds: Joi.string().label('selectedOfferingIds').required()
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
