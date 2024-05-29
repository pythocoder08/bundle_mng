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
    const { userID, company } = req.user
    const vendor = await VendorService.fetchVendorByCompany(company)

    if (!vendor) throw Boom.notFound('The vendor does not exist.')

    const catalog = await VendorService.findCatalog(company)
    if (!catalog) throw Boom.notFound('The catalog does not exist.')

    const offerings = await BundleService.fetchBundleofferings(
      vendor.vendor_ID,
      catalog.catalogID,
      req.query.bundle_ID,
      req.query.componentType
    )

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
    const { userID, company } = req.user
    const vendor = await VendorService.fetchVendorByCompany(company)

    if (!vendor) throw Boom.notFound('The vendor does not exist.')

    const catalog = await VendorService.findCatalog(company)
    if (!catalog) throw Boom.notFound('The catalog does not exist.')

    const components = await BundleService.run_Deets_Get_Components(
      vendor.vendor_ID,
      catalog.catalogID,
      0,
      req.query.componentType
    )

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
export const fetchLatestBundleId = async (req, res, next) => {
  try {
    const LastID = await BundleService.fetchLatestBundleId()
    res.json({ LastID })
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
    const { company_ID, bundleName, bundleDesc, selectedOfferingIds, componentIds } = req.body

    const { userID, company } = req.user
    const vendor = await VendorService.fetchVendorByCompany(company)

    if (!vendor) throw Boom.notFound('The vendor does not exist.')

    const catalog = await VendorService.findCatalog(company_ID)
    if (!catalog) throw Boom.notFound('The catalog does not exist.')

    const latestBundleId = await BundleService.fetchLatestBundleId()
    const bundle_ID = +latestBundleId + 1

    for (let cid of componentIds) {
      console.log('component_id = ', cid)
      await BundleService.createBundlePricing(vendor.vendor_ID, catalog.catalogID, bundle_ID, cid)
    }

    await BundleService.run_Deets_Save_New_Bundle(
      vendor.vendor_ID,
      catalog.catalogID,
      bundle_ID,
      bundleName,
      bundleDesc
    )
    await BundleService.run_Deets_Save_Bundle_Offerings(
      vendor.vendor_ID,
      catalog.catalogID,
      bundle_ID,
      selectedOfferingIds
    )

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
    const { customerName, bundle_ID } = req.body

    const { company } = req.user

    const vendor = await VendorService.fetchVendorByCompany(company)

    const bundle = await BundleService.copyBundle({
      vendor_ID: vendor.vendor_ID,
      customerName,
      bundle_ID
    })

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
