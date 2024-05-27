import VendorService from '../services/VendorService'

/**
 * Fetch vendors.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchVendors = async (_, res, next) => {
  try {
    const vendors = await VendorService.fetchVendors()

    res.json({ vendors })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch vendor companylinks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchVendorCompanyLinks = async (req, res, next) => {
  try {
    const vendor = await VendorService.fetchVendorByUser(req.user.company)
    const companyLinks = await VendorService.fetchVendorCompanyLinks(vendor.vendor_ID)

    res.json({ companyLinks })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch a1 chart data.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchStoredProc = async (req, res, next) => {
  try {
    const chart = await VendorService.fetchStoredProc(req.params.vendor_ID, req.params.company_ID)

    res.json({ chart })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch a2 chart data.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchStoredCol = async (req, res, next) => {
  try {
    const chart = await VendorService.fetchStoredCol(req.params.vendor_ID)

    res.json({ chart })
  } catch (err) {
    next(err)
  }
}
