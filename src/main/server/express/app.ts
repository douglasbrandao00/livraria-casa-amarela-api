
import express, { json } from 'express'
import {makeCreateAccountController} from 'App/main/factories/make-create-account-controller'
import {routerAdapter} from './router-adpater'
import {makeRegisterBookController} from '../../factories/make-register-book-controller'
import {makeUpdateBookController} from '../../factories/make-update-book-controller'
import {makeDeleteBookController} from '../../factories/make-delete-account-controller'
import {makeDetailBookController} from '../../factories/make-detail-account-controller'

export default function expressApp() {

  const app = express()

  app.use(json())

  app.get('/', (_req, res)=> res.send('haksdhakshdkjahsd'))
  app.post('/api/signup', routerAdapter(makeCreateAccountController()))
  app.post('/api/book', routerAdapter(makeRegisterBookController()))
  app.put('/api/book', routerAdapter(makeUpdateBookController()))
  app.delete('/api/book/:bookId', routerAdapter(makeDeleteBookController()))
  app.get('/api/book/:bookId', routerAdapter(makeDetailBookController()))

  return app
}
