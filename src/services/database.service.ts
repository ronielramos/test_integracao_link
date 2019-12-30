import { Collection, Db } from 'mongodb'
import DbClient = require('./infra/database.infra')

let collections: {
  pedido: Collection;
}

const bdConectado = (db: unknown): db is Db => {
  return db ? (db as Db).collection !== undefined : false
}

export const getCollection = (nome: 'pedido'): Collection => {
  if (collections && collections[nome]) return collections[nome]
  if (!bdConectado(DbClient.db)) throw new Error('Falha de conexão com o BD')

  const db: Db = DbClient.db

  collections = {
    pedido: db.collection('pedido')
  }

  return collections[nome]
}
