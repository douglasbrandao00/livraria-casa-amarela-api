import express, {Request, Response, json} from 'express'
import {HttpRequest} from 'root/src/presentation/protocols'
import {makeCreateAccountController} from '../factories/make-create-account-controller'

const app = express()

app.use(json())

app.post('/api/signup', async (req: Request, res: Response) => {
  const reqHttp: HttpRequest = {
    body: req.body
  }
  const controller = makeCreateAccountController()
  const resHttp = await controller.handle(reqHttp)
  console.log(resHttp)

  res.status(resHttp.statusCode).json(resHttp.body).send()
})


export default function expressApp() {
  return app
}
