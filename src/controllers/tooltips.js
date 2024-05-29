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
    const tooltip = await TooltipService.fetchTooltip({ dashboard:req.query.dashboard, object: req.query.object })

    res.json({ tooltip })
  } catch (err) {
    next(err)
  }
}
