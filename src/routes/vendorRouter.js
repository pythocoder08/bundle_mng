import express from 'express'

import auth from '../middlewares/auth'

import {
  getDeliveryCosts,
  getDeliveryHours,
  getMarginSummary,
  getRevenueSummary,
  fetchVendorCompanyList,
  fetchVendors
} from '../controllers/vendors'

import { ADMIN } from '../config/constants'

const router = express.Router()

router.get('/', auth(ADMIN), fetchVendors)
router.get('/fetch-company-list', auth(ADMIN), fetchVendorCompanyList)
router.get('/get-revenue-summary', auth(ADMIN), getRevenueSummary)
router.get('/get-margin-summary', auth(ADMIN), getMarginSummary)
router.get('/get-delivery-hours', auth(), getDeliveryHours)
router.get('/get-delivery-costs', auth(), getDeliveryCosts)

export default router
