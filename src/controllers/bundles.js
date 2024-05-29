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

    const { userID, company } = req.user;
    const vendor = await VendorService.fetchVendorByCompany(company);

    if (!vendor) 
      throw Boom.notFound('The vendor does not exist.')

    const catalog = await VendorService.findCatalog(company);
    if(!catalog)
      throw Boom.notFound('The catalog does not exist.')

    const offerings = await BundleService.fetchBundleofferings(vendor.vendor_ID, catalog.catalogID, req.query.bundle_ID, req.query.componentType)

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
    const { userID, company } = req.user;
    const vendor = await VendorService.fetchVendorByCompany(company);

    if (!vendor) 
      throw Boom.notFound('The vendor does not exist.')

    const catalog = await VendorService.findCatalog(company);
    if(!catalog)
      throw Boom.notFound('The catalog does not exist.')

    console.log("--------", vendor.vendor_ID, catalog.catalogID, 0, req.query.componentType)
    const components = await BundleService.run_Deets_Get_Components(vendor.vendor_ID, catalog.catalogID, 0, req.query.componentType)

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
export const createBundle = async (req, res, next) => {
  try {
    const { vendor_ID, company_ID, bundleName, bundleDesc, selectedOfferingIds } = req.body

    const latestBundle = await BundleService.fetchLatestBundle()

    const bundle_ID = +latestBundle.bundle_ID + 1

    const vendor = VendorService.fetchVendor({ vendor_ID })

    if (!vendor) throw Boom.notFound('The vendor does not exist.')

    await BundleService.run_Deets_Save_New_Bundle({ vendor_ID, company_ID, bundle_ID, bundleName, bundleDesc })

    await BundleService.run_Deets_Save_Bundle_Offerings({ vendor_ID, company_ID, bundle_ID, selectedOfferingIds })

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
export const updateBundle = async (req, res, next) => {
  try {
    const { bundle_ID } = req.params
    const { bundleName, bundleDesc, selectedOfferingIds } = req.body

    const rawBundle = await BundleService.fetchBundle({ bundle_ID })

    const bundle = await BundleService.updateBundle({ bundle_ID, bundleName, bundleDesc })

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

/**
 * fetch bundle P and L.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchBundlePL = async (req, res, next) => {
  try {
    const bundle = await BundleService.fetchBundlePL(req.query)

    res.json({ bundle })
  } catch (err) {
    next(err)
  }
}
