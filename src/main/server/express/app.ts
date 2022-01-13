
import express, { json } from 'express'
import {makeCreateAccountController} from 'App/main/factories/make-create-account-controller'
import {routerAdapter} from './router-adpater'

export default function expressApp() {

  const app = express()

  app.use(json())

  app.get('/', (req, res)=> res.send('haksdhakshdkjahsd'))
  app.post('/api/signup', routerAdapter(makeCreateAccountController()))

  return app
}
