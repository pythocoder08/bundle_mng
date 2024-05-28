import express from 'express'

import { ADMIN } from '../config/constants'

import auth from '../middlewares/auth'

import {
  buildNewBundle,
  eidtBundle,
  fetchBundleComponents,
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

router.post('/', auth(ADMIN), bundleValidator, buildNewBundle)

router.put('/:bundle_ID', auth(ADMIN), eidtBundle)

export default router
