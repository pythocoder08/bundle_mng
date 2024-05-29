import express from 'express'

import { ADMIN } from '../config/constants'

import auth from '../middlewares/auth'

import {
  createBundle,
  copyBundle,
  updateBundle,
  fetchBundleComponents,
  fetchBundlePL,
  fetchBundleofferings,
  fetchBundles,
  fetchLatestBundle
} from '../controllers/bundles'

import { bundleValidator } from '../validators/bundleValidator'

const router = express.Router()

router.get('/fetch-bundles', auth(), fetchBundles)

router.get('/latest', auth(), fetchLatestBundle)

router.get('/offerings', auth(ADMIN), fetchBundleofferings)

router.get('/components', auth(ADMIN), fetchBundleComponents)

router.get('/profit-and-loss', auth(), fetchBundlePL)

router.post('/create-bundle', auth(ADMIN), bundleValidator, createBundle)

router.post('/copy', auth(ADMIN), copyBundle)

router.put('/:bundle_ID', auth(ADMIN), updateBundle)

export default router
