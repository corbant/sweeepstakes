import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import { apiRouter, websocketProxy } from './routes'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
const server = http.createServer(app)

const port = process.argv.length > 2 ? process.argv[2] : 4000

// JSON body parsing using built-in middleware
app.use(express.json())

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser())

// Serve up the front-end static content hosting
app.use(express.static('public'))

// Router for service endpoints
app.use('/api', apiRouter)

//fallback to react router for 404 page
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweeepstakes'
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

// Start the server
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

websocketProxy(server)
