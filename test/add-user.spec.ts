import { SignUpController } from '../src/presentation/SignUpController'
import {MissingParamError} from '../src/presentation/erros/missing-param-error';
import {HttpRequest} from './presentation/protocols/http';

function makeUserCandidate(): HttpRequest {
  return {
    body: {
      name: 'an_name',
      email: 'any_email@nanana.com',
      password: 'any_password',
      confirmPassword: 'any_password'
    }
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const userCandidate = makeUserCandidate()
    userCandidate.body.name = ''

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const userCandidate = makeUserCandidate()
    userCandidate.body.email = ''

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
});
