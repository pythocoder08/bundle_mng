import express from 'express'

import auth from '../middlewares/auth'
import { login } from '../controllers/login'
import { fetchMe } from '../controllers/users'
import { userValidator } from '../validators/userValidator'

const router = express.Router()

router.get('/', auth(), fetchMe)
router.post('/login', userValidator, login)

export default router
