import express from 'express'

import { ADMIN } from '../config/constants'

import auth from '../middlewares/auth'

import {
  buildNewBundle,
  copyBundle,
  eidtBundle,
  fetchBundleComponents,
  fetchBundlePL,
  fetchBundleofferings,
  fetchBundles,
  fetchLatestBundle
} from '../controllers/bundles'

import { bundleValidator } from '../validators/bundleValidator'

const router = express.Router()

router.get('/', auth(), fetchBundles)

router.get('/latest', auth(), fetchLatestBundle)

router.get('/offerings', auth(ADMIN), fetchBundleofferings)

router.get('/components', auth(ADMIN), fetchBundleComponents)

router.get('/pl', auth(), fetchBundlePL)

router.post('/', auth(ADMIN), bundleValidator, buildNewBundle)

router.post('/copy', auth(ADMIN), copyBundle)

router.put('/:bundle_ID', auth(ADMIN), eidtBundle)

export default router
