import { MongoClient, Db } from 'mongodb'

class DbClient {
  public db: Db | undefined
  public connecting = false

  constructor () {
    this.connect()
  }

  public async connect (): Promise<Db | undefined> {
    try {
      if (this.connecting) return
      if (this.db) return this.db

      this.connecting = true

      const database = await MongoClient.connect(process.env.MONGODB_URI || '', {
        poolSize: 10,
        reconnectInterval: 2000,
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      this.db = database.db('db_teste_integracao_link')
      this.connecting = false

      console.log('MongoDB connected')

      return this.db
    } catch (e) {
      console.error(e)
      return undefined
    }
  }
}

export = new DbClient()
