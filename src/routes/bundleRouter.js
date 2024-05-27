import express from 'express'

import { ADMIN } from '../config/constants'

import auth from '../middlewares/auth'

import { buildNewBundle, fetchBundleComponents, fetchBundleofferings, fetchLatestBundle } from '../controllers/bundles'

import { bundleValidator } from '../validators/bundleValidator'

const router = express.Router()

router.get('/latest', auth(), fetchLatestBundle)

router.get('/offerings', auth(ADMIN), fetchBundleofferings)

router.get('/components', auth(ADMIN), fetchBundleComponents)

router.post('/', auth(ADMIN), bundleValidator, buildNewBundle)

export default router
