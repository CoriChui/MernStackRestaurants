import express from 'express'
import { register, login, confirmEmail } from '../controllers/authentication.controller.js'

const router = express.Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/confirmemail/:token").put(confirmEmail)

export default router