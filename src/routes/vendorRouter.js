import express from 'express'

import auth from '../middlewares/auth'

import { fetchStoredCol, fetchStoredProc, fetchVendorCompanyLinks, fetchVendors } from '../controllers/vendors'

import { ADMIN } from '../config/constants'

const router = express.Router()

router.get('/', auth(ADMIN), fetchVendors)
router.get('/companylinks', auth(ADMIN), fetchVendorCompanyLinks)
router.get('/chart/a1/:vendor_ID/:company_ID', auth(ADMIN), fetchStoredProc)
router.get('/chart/a2/:vendor_ID', auth(ADMIN), fetchStoredCol)

export default router
