import Tooltip from '../models/Tooltip'

export default class TooltipService {
  /**
   * Get a tooltip.
   *
   * @param   {Object}  query
   * @returns {Promise<Tooltip|null>}
   */
  static async fetchTooltip(query = {}) {
    try {
      const tooltip = await Tooltip.findOne({ where: { ...query }, raw: true })

      return tooltip
    } catch (err) {
      throw err
    }
  }
}
