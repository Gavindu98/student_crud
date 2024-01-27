import { MongoClient, MongoClientOptions } from 'mongodb'

const options: MongoClientOptions = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

if (!client) {
  client = new MongoClient(process.env.MONGODB_URI, options)
  clientPromise = client.connect()
}

export default clientPromise