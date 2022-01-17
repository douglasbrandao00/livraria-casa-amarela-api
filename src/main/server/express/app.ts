
import express, { json } from 'express'
import {makeCreateAccountController} from 'App/main/factories/make-create-account-controller'
import {routerAdapter} from './router-adpater'
import {makeRegisterBookController} from '../../factories/make-register-book-controller'

export default function expressApp() {

  const app = express()

  app.use(json())

  app.get('/', (_req, res)=> res.send('haksdhakshdkjahsd'))
  app.post('/api/signup', routerAdapter(makeCreateAccountController()))
  app.post('/api/book', routerAdapter(makeRegisterBookController()))

  return app
}
