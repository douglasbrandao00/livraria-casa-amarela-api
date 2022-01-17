import {Request, Response} from 'express'
import {Controller, HttpRequest} from 'App/presentation/protocols'

export function routerAdapter(controller: Controller){
  return async (req: Request, res: Response) => {
    const reqHttp: HttpRequest = {
      body: req.body
    }
    const resHttp = await controller.handle(reqHttp)
      if(resHttp.body instanceof Error) {
        return res.status(resHttp.statusCode).send({message:resHttp.body.message})
      }
      return res.status(resHttp.statusCode).send(resHttp.body)
    }
  }

