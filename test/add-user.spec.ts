import { SignUpController } from '../src/presentation/SignUpController'
import {MissingParamError} from '../src/presentation/erros/missing-param-error';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const userCandidate = {
      email: 'any_email@nanana.com',
      password: 'any_password',
      confirmPassword: 'any_password'
    }

    const sut = new SignUpController()

    const httpResponse = sut.handle({body: userCandidate})

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
  test('Should return 400 if no email is provided', () => {
    const userCandidate = {
      name: 'any_name',
      //email: 'any_email@nanana.com',
      password: 'any_password',
      confirmPassword: 'any_password'
    }

    const sut = new SignUpController()

    const httpResponse = sut.handle({body: userCandidate})

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

});
