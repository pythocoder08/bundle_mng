import Boom from '@hapi/boom'
import BundleService from '../services/BundleService'
import VendorService from '../services/VendorService'

/**
 * Fetch bundles.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchBundles = async (_, res, next) => {
  try {
    const bundles = await BundleService.fetchBundles()

    res.json({ bundles })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch bundle offerings.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchBundleofferings = async (req, res, next) => {
  try {
    const vendor = VendorService.fetchVendor({ vendor_ID: req.query.vendor_ID })

    if (!vendor) throw Boom.notFound('The vendor is not exist')

    const offerings = await BundleService.fetchBundleofferings(req.query)

    res.json({ offerings })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch bundle components.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchBundleComponents = async (req, res, next) => {
  try {
    const vendor = VendorService.fetchVendor({ vendor_ID: req.query.vendor_ID })

    if (!vendor) throw Boom.notFound('The vendor is not exist')

    const bundle = await BundleService.fetchLatestBundle()

    const components = await BundleService.fetchBundleComponents({ ...req.query, bundle_ID: +bundle.bundle_ID + 1 })

    res.json({ components })
  } catch (err) {
    next(err)
  }
}

/**
 * Fetch latest bundle.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchLatestBundle = async (req, res, next) => {
  try {
    const bundle = await BundleService.fetchLatestBundle()

    res.json({ bundle })
  } catch (err) {
    next(err)
  }
}

/**
 * Build a new bundle.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const buildNewBundle = async (req, res, next) => {
  try {
    const { vendor_ID, company_ID, bundleName, bundleDesc, selectedOfferingIds } = req.body

    const latestBundle = await BundleService.fetchLatestBundle()

    const bundle_ID = +latestBundle.bundle_ID + 1

    const vendor = VendorService.fetchVendor({ vendor_ID })

    if (!vendor) throw Boom.notFound('The vendor is not exist')

    await BundleService.buildNewBundle({ vendor_ID, company_ID, bundle_ID, bundleName, bundleDesc })

    await BundleService.saveBundleOfferings({ vendor_ID, company_ID, bundle_ID, selectedOfferingIds })

    res.json({ bundle: { message: 'success' } })
  } catch (err) {
    next(err)
  }
}

/**
 * Build a new bundle.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const eidtBundle = async (req, res, next) => {
  try {
    const { bundle_ID } = req.params
    const { bundleName, bundleDesc, selectedOfferingIds } = req.body

    const rawBundle = await BundleService.fetchBundle({ bundle_ID })

    const bundle = await BundleService.editBundle({ bundle_ID, bundleName, bundleDesc })

    await BundleService.saveBundleOfferings({
      vendor_ID: rawBundle.vendor_ID,
      company_ID: rawBundle.vendor_ID,
      bundle_ID,
      selectedOfferingIds
    })

    res.json({ bundle })
  } catch (err) {
    next(err)
  }
}

/**
 * Copy bundle.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const copyBundle = async (req, res, next) => {
  try {
    const bundle = await BundleService.copyBundle(req.body)

    res.json({ bundle })
  } catch (err) {
    next(err)
  }
}
