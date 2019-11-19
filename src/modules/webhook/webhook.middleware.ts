import { RequestHandler } from 'express'

export const authentication: RequestHandler = (req, res, next) => {
  if (req.headers['user-agent'] !== 'Pipedrive Webhooks') {
    console.log('REQUEST NÃO AUTORIZADA')
    return res.status(401).end()
  }
  next()
}
