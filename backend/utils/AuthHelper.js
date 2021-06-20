import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const matchPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
}
export const getSignedToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}
