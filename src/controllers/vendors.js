import BundleService from '../services/BundleService'
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
export const getRevenueSummary = async (req, res, next) => {
  try {
    const chart = await VendorService.getRevenueSummary(req.query.vendor_ID, req.query.company_ID)

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
export const getMarginSummary = async (req, res, next) => {
  try {
    const chart = await VendorService.getMarginSummary(req.query.vendor_ID)

    res.json({ chart })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch c1 chart data.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const getDeliveryHours = async (req, res, next) => {
  try {
    const chart = await BundleService.fetchBundleHoursByCtg(req.query)

    res.json({ chart })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch c2 chart data.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const getDeliveryCosts = async (req, res, next) => {
  try {
    const chart = await await BundleService.fetchBundleDeliveryCoats(req.query)

    res.json({ chart })
  } catch (err) {
    next(err)
  }
}
