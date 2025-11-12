import express from 'express'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import authRouter from './routes/auth.route'
import 'dotenv/config'
import groupRouter from './routes/group.route'
import userRouter from './routes/user.route'
import checkAuthentication from './middleware/checkAuthentication'

const app = express()

const port = process.argv.length > 2 ? process.argv[2] : 4000

// JSON body parsing using built-in middleware
app.use(express.json())

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser())

// Serve up the front-end static content hosting
app.use(express.static('public'))

// Router for service endpoints

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.use('/api/auth', authRouter)
// Protected routes
app.use('/api/group', checkAuthentication, groupRouter)
app.use('/api/user', checkAuthentication, userRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
