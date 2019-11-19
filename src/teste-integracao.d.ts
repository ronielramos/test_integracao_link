export type Pedido = {
  cliente: {
    nome: string;
  };
  itens: {
    codigo: number;
    descricao: string;
    qtde: number;
    vlr_unit: number;
  }[];
};

export type RetornoCriacaoPedido = {
  retorno: {
    pedidos: [
      {
        pedido: {
          numero: string;
          idPedido: number;
          codigos_rastreamento: {
            codigo_rastreamento: null;
          };
          volumes: null;
        };
      }
    ];
  };
};
