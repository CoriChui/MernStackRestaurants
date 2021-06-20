import UsersDao from '../dao/usersDao.js'
import transporter from '../utils/EmailSender.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import ErrorResponse from '../utils/ErrorResponse.js'
import { matchPassword, getSignedToken } from '../utils/AuthHelper.js'

export const register = async (req, res, next) => {
  const { name, email, password } = req.body

  if (!email || !name || !password) {
    return next(new ErrorResponse("Missing input field", 400))
  }

  try {
    const hashed = await bcrypt.hash(password, 10)
    const token = crypto.randomBytes(20).toString("hex")
    const emailToken = crypto.createHash("sha256").update(token).digest("hex")
    const expiresIn = Date.now() + 10 * 60 * 1000
    const result = await UsersDao.insert(name, email, hashed, emailToken, expiresIn)
    const user = JSON.parse(result).ops[0]
    const resetUrl = `http://localhost:3000/confirmemail/${token}`
    const message = `
      <h1>Confirm your email</h1>
      <p>Please click a link below to proceed.</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `
    transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Email confirmation request",
      html: message,
    }).then(() => {
      res.status(200).send(`Confirmation email was sent to ${user.email}`)
    }).catch((error) => {
      UsersDao.delete(email).then(() => {
        return next(new ErrorResponse("Email could not be sent", 500))
      })
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).send("Please provide email and password")
  }
  try {
    const user = await UsersDao.login(email, password)
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401))
    }
    const isMatch = await matchPassword(password, user)
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401))
    }
    sendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

export const confirmEmail = async (req, res, next) => {
  const confirmEmailToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
  try {
    const { value } = await UsersDao.confirm(confirmEmailToken)
    if (!value.enabled) {
      return next(new ErrorResponse("Invalid token", 400))
    }
    res.status(200).send("Email confirmed")
  } catch (error) {
    next(error)
  }
}

const sendToken = (user, statusCode, res) => {
  const token = getSignedToken(user)
  const userId = user._id
  const name = user.name
  res.status(statusCode).json({ success: true, token, userId, name })
}