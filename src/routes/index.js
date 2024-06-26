import { Router } from 'express'

import authRouter from './authRouter'
import vendorRouter from './vendorRouter'
import bundleRouter from './bundleRouter'
import tooltipRouter from './tooltipRouter'

const router = Router()

router.use('/auth', authRouter)
router.use('/vendors', vendorRouter)
router.use('/bundles', bundleRouter)
router.use('/tooltips', tooltipRouter)

export default router
