import TooltipService from '../services/TooltipService'

/**
 * fetchTooltip
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchTooltip = async (req, res, next) => {
  try {
    const tooltip = await TooltipService.fetchTooltip({ description: req.params.description })

    res.json({ tooltip })
  } catch (err) {
    next(err)
  }
}
