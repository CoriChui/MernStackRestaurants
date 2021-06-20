import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import errorHandler from './middleware/error.js'
import restaurants from './routes/restaurants.route.js'
import authentication from './routes/authentication.route.js'
import { connectToDb } from './config/db.js'

dotenv.config({ path: "./config/.env" })
const app = express()
const port = process.env.PORT || 5000
connectToDb()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("/api/v1/auth", authentication)
app.use(errorHandler)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

export default app