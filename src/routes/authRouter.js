import express from 'express'

import auth from '../middlewares/auth'
import { login } from '../controllers/login'
import { fetchMe } from '../controllers/users'

const router = express.Router()

router.get('/', auth(), fetchMe)
router.post('/login', login)

export default router
