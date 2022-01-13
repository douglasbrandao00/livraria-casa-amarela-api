
import express, { json } from 'express'
import {makeCreateAccountController} from 'App/main/factories/make-create-account-controller'
import {routerAdapter} from './router-adpater'

const app = express()

app.use(json())

app.post('api/signup', routerAdapter(makeCreateAccountController()))

export default function expressApp() {
  return app
}
