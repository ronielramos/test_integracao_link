import express from "express";
import { getCollection } from "../../services/database.service";
import { FindOneOptions } from "mongodb";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const queryPagina = parseInt(req.query.pagina, 10);
    const queryQtd = parseInt(req.query.qtd, 10);

    const pagina = queryPagina || 1;
    const qtd = queryQtd || 10;

    const pular = (pagina - 1) * qtd;

    const PedidoCollection = getCollection("pedido");

    const options: FindOneOptions = {
      sort: { _id: -1 },
      skip: pular,
      limit: qtd
    };

    const pedidosPorDia = await PedidoCollection.find({}, options).toArray()
    
    console.log(pedidosPorDia);

    res.json({ pagina, qtd_solicitada: qtd, qtd_recebida: pedidosPorDia.length, itens: pedidosPorDia });
  } catch (e) {
    console.error(e);
    res.status(500).json({ internal: e.message });
  }
});

export = router;
