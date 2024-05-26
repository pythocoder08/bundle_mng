import express from 'express'

import auth from '../middlewares/auth'

import { fetchStoredProc, fetchVendorCompanyLinks } from '../controllers/vendors'
import { checkVenderPermission } from '../validators/vendorValidator'

const router = express.Router()

router.get('/companylinks', auth(), checkVenderPermission, fetchVendorCompanyLinks)
router.get('/chart/a1/:company', auth(), checkVenderPermission, fetchStoredProc)

export default router
