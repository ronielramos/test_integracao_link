import { criarPedido } from "../../services/bling.service";
import { RetornoCriacaoPedido, Pedido } from "../../teste-integracao";
import { getCollection } from "../../services/database.service";

type Data = {
  person_name: string;
  title: string;
  value: number;
};

export const transformar = (data: Data): Pedido => {
  return {
    cliente: {
      nome: data.person_name
    },
    itens: [
      {
        codigo: Date.now(),
        descricao: data.title,
        qtde: 1,
        vlr_unit: data.value
      }
    ]
  };
};

export const criarPedidoBling = (
  pedido: Pedido
): Promise<RetornoCriacaoPedido> => {
  return criarPedido(pedido);
};

export const salvarPedidoNoBd = async (pedido: Pedido): Promise<unknown> => {
  const PedidoCollection = getCollection("pedido");

  const hoje = new Date().toLocaleDateString("pt-br");
  const pedidosDoDia = await PedidoCollection.findOne({ dia: hoje });

  if (pedidosDoDia) {
    pedidosDoDia.pedidos.push(pedido);
    return pedidosDoDia.save();
  }

  return PedidoCollection.insertOne({ dia: hoje, pedidos: [pedido] });
};
