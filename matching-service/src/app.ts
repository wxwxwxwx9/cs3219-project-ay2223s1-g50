import 'dotenv/config'
import express, { Application, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from '../build/routes'
import { errorHandler, requestLogger } from './middleware/logging'
import { corsWithOptions } from './middleware/cors'
import cookieParser from 'cookie-parser'
import { MatchSocket } from './routes/match/match.socket'
import { Server } from 'socket.io'
import { createServer } from 'http'

export const app: Application = express()

app.use(cookieParser())
app.use(corsWithOptions)
app.use(express.json())
app.use(requestLogger)

app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
})

RegisterRoutes(app)

app.use(errorHandler)

export const socketIo = new MatchSocket(new Server(createServer()))
