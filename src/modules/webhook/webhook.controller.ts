import { RequestHandler } from 'express'
import {
  salvarPedidoNoBd,
  transformar,
  criarPedidoBling
} from './webhook.service'

export const escutarEdicaoDoDeal: RequestHandler = async (req, res) => {
  try {
    const dealEditado = req.body.current
    console
    if (dealEditado.status !== 'won') {
      console.log(`Deal ${dealEditado.title} NÃO ESTÁ NO STATUS 'GANHO'`)
      return res.end()
    }

    const pedido = transformar(dealEditado)
    console.log(`PEDIDO: ${JSON.stringify(pedido, null, 4)}`)

    await criarPedidoBling(pedido)
    console.log('PEDIDO CRIADO NO BLING COM SUCESSO')

    await salvarPedidoNoBd(pedido)
    console.log('PEDIDO SALVO NO BD COM SUCESSO')

    res.end()
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
