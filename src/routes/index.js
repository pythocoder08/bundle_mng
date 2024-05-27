import { Router } from 'express'

import authRouter from './authRouter'
import vendorRouter from './vendorRouter'
import bundleRouter from './bundleRouter'

const router = Router()

router.use('/auth', authRouter)
router.use('/vendors', vendorRouter)
router.use('/vendors', vendorRouter)
router.use('/bundles', bundleRouter)

export default router
