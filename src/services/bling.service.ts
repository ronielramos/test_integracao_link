import { Pedido, RetornoCriacaoPedido } from '../teste-integracao'
import { executar } from './external-request'
import { toXML } from './utils'

export const criarPedido = async (pedido: Pedido): Promise<RetornoCriacaoPedido> => {
  const pedidoFormatado = {
    pedido: {
      cliente: pedido.cliente,
      item: pedido.itens
    }
  }

  const pedidoXML = toXML(pedidoFormatado)
  const XML = `
    <?xml version="1.0" encoding="UTF-8"?>
    ${pedidoXML}
  `

  const resultado = await executar({
    method: 'POST',
    url: 'https://bling.com.br/Api/v2/pedido/json/',
    qs: {
      apikey: process.env.BLING_API_KEY,
      xml: XML
    }
  })
  return resultado.body as RetornoCriacaoPedido
}
