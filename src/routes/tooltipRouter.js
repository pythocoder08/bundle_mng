import express from 'express'

import auth from '../middlewares/auth'

import { fetchTooltip } from '../controllers/tooltips'

const router = express.Router()

router.get('/:description', auth(), fetchTooltip)

export default router
