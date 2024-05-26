import Boom from '@hapi/boom'

import VendorService from '../services/VendorService'

export const fetchVendorCompanyLinks = async (req, res, next) => {
  try {
    const vendor = await VendorService.fetchVendorByUser(req.user.company)
    const companyLinks = await VendorService.fetchVendorCompanyLinks(vendor.vendor_ID)

    res.json({ companyLinks })
  } catch (err) {
    next(err)
  }
}

export const fetchStoredProc = async (req, res, next) => {
  try {
    const vendor = await VendorService.fetchVendorByUser(req.user.company)
    const chart = await VendorService.fetchStoredProc(vendor.vendor_ID, req.params.company)

    res.json({ chart })
  } catch (err) {
    next(err)
  }
}
