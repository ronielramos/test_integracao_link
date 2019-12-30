import express from 'express'
import { FindOneOptions } from 'mongodb'

import { getCollection } from '../../services/database.service'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const queryPagina = parseInt(req.query.pagina, 10)
    const queryQtd = parseInt(req.query.qtd, 10)

    const pagina = queryPagina || 1
    const qtd = queryQtd || 10

    const pular = (pagina - 1) * qtd

    const PedidoCollection = getCollection('pedido')

    const options: FindOneOptions = {
      sort: { _id: -1 },
      skip: pular,
      limit: qtd
    }

    const pedidosPorDia = await PedidoCollection.find({}, options).toArray()

    console.log(pedidosPorDia)

    res.json({
      pagina,
      qtdSolicitada: qtd,
      qtdRecebida: pedidosPorDia.length,
      itens: pedidosPorDia
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ internal: e.message })
  }
})

export = router;
