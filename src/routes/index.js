import { Router } from 'express'

import authRouter from './authRouter'
import vendorRouter from './vendorRouter'

const router = Router()

router.use('/auth', authRouter)
router.use('/vendors', vendorRouter)

export default router
