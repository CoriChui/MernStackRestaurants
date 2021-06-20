import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 25,
  ignoreTLS: true,
  secure: false
})

export default transporter

