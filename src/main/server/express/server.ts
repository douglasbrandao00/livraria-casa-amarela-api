import 'module-alias/register'

import getExpressApp from 'App/main/server/express/app'
import mongo from 'App/infra/mongo/mongoHelper'

const mongoUrl = 'mongodb://root:root@db/book?authSource=admin'

const SERVER_PORT = 3000
mongo.connect(mongoUrl)
  .then(() => getExpressApp())
  .then((app) => app.listen(SERVER_PORT, () => console.log(`Up and running at: ${SERVER_PORT}`)))

