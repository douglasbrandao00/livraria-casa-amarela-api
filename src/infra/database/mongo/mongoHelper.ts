import {MongoClient} from 'mongodb'

class MongoConnection {
  
  connection?: MongoClient
  async connect(uri: string): Promise<void> {
    const client = new MongoClient(uri); 
    this.connection = await client.connect()
  }
  async disconnect() {
    await this.connection?.close()
    this.connection = undefined
  }
  getColletction(collection: string) {
    return this.connection?.db().collection(collection) 
  }
}

export default new MongoConnection()

