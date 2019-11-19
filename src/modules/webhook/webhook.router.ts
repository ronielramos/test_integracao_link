import * as controller from './webhook.controller'
import * as middleware from './webhook.middleware'
import express from 'express'
const router = express.Router()

router.post('/notificacao/deal/edicao', middleware.authentication, controller.escutarEdicaoDoDeal)

export = router
