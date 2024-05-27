/**
 * Fetch me
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} _
 */
export const fetchMe = async (req, res, _) => {
  res.json({ user: req.user })
}
