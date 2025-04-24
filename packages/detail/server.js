import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors' // Import CORS middleware
import dotenv from 'dotenv' // Import dotenv

dotenv.config()

const app = express()
const PORT = parseInt(process.env.REMOTE_DETAIL_PORT)

// Required for handling `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Enable CORS for all routes
app.use(cors())

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' })
})

// Serve static files from the "dist" folder (including remoteEntry.js)
app.use(express.static(path.join(__dirname, 'dist')))

// Handle fallback for Single Page Applications (Optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
  console.log(
    `RemoteEntry.js is accessible at http://localhost:${PORT}/remoteEntry.js`
  )
})
