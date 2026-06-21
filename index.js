const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000
const START_TIME = Date.now()

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: Math.floor((Date.now() - START_TIME) / 1000) })
})

// Root
app.get('/', (req, res) => {
  res.json({
    name: 'Blink Demo API',
    version: '1.0.0',
    deployed_by: 'Blink AI Deployment Platform',
    cloud: 'AWS EC2 · us-east-1',
    status: 'running',
    uptime_seconds: Math.floor((Date.now() - START_TIME) / 1000),
    timestamp: new Date().toISOString(),
    endpoints: ['GET /', 'GET /health', 'GET /info', 'GET /ping']
  })
})

// Info
app.get('/info', (req, res) => {
  res.json({
    platform: 'Blink',
    runtime: `Node.js ${process.version}`,
    environment: process.env.NODE_ENV || 'production',
    memory_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    uptime_seconds: Math.floor((Date.now() - START_TIME) / 1000),
    started_at: new Date(START_TIME).toISOString(),
  })
})

// Ping
app.get('/ping', (req, res) => {
  res.json({ pong: true, time: Date.now() })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Blink Demo API running on port ${PORT}`)
})
