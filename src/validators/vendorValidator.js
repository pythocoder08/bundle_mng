import Boom from '@hapi/boom'

const checkVenderPermission = async (req, _, next) => {
  try {
    const { vendor } = req.user

    if (vendor !== 'Yes') throw Boom.forbidden(`You do not have vendor permission`)

    next()
  } catch (err) {
    next(err)
  }
}

export { checkVenderPermission }
