import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'

import webhookRoute from './modules/webhook/webhook.router'
import pedidosRoute from './modules/report/report.controller'

require('dotenv').config()

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With'
  ],
  credentials: true
}

// Compactação
app.use(compression())
// Segurança
app.use(helmet())

app.use(express.json())
app.use(cors(corsOptions))
app.use('/webhook', webhookRoute)
app.use('/pedidos', pedidosRoute)

app.listen(process.env.PORT, () =>
  console.log(`SERVER ON PORT: ${process.env.PORT}`)
)
