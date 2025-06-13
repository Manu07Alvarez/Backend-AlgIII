
await import('./utils/telemetry/Instrumentation.ts')
import * as dotenv from 'dotenv'
dotenv.config() // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`)
await import('./app.ts')
