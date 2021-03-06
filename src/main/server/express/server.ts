import 'module-alias/register'

import mongo from 'mongoose'

const mongoUrl = 'mongodb://mongo:1234@localhost:27017/book?authSource=admin'

const SERVER_PORT = 3000
mongo.connect(mongoUrl)
  .then(async () => {
    const setupApp  = (await import('./app')).default
    const app = await setupApp()
    return app
  })
  .then((app) => app.listen(SERVER_PORT, () => console.log(`Up and running at: ${SERVER_PORT}!`)))

