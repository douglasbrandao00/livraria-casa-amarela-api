import { SignUpController } from '../src/presentation/SignUpController'
import {MissingParamError, InvalidPassword, InvalidParam, ServerError } from '../src/presentation/erros';
import {HttpRequest, EmailValidator} from './presentation/protocols/';

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

class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true
  isValid(_email: string): boolean {
    return this.isEmailValid
  }
}

function makeSut(_candidate: HttpRequest) {
  

  const emailValidator = new EmailValidatorSpy()

  const sut = new SignUpController(emailValidator)
  return {
    sut,
    emailValidator
  }

}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.name = ''
    const { sut } = makeSut(userCandidate)

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
  test('Should return 400 if no email is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.email = ''
    const { sut } = makeSut(userCandidate)

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.password = ''
    const { sut } = makeSut(userCandidate)

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no confirmPassword is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.confirmPassword = ''
    const { sut } = makeSut(userCandidate)

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
  })
  test('Should return 400 if password and confirmPassword are diffrent', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.confirmPassword = 'diffrent password'
    const { sut } = makeSut(userCandidate)

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidPassword())
  })
  test('Should return 400 if email is invalid', () => {
    const userCandidate = makeUserCandidate()
    const { sut, emailValidator } = makeSut(userCandidate)
    emailValidator.isEmailValid = false

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParam('email'))
  })
  test('Should return 500 if email email validator throws', () => {
    const userCandidate = makeUserCandidate()
    const { sut, emailValidator } = makeSut(userCandidate)
    emailValidator.isValid = () => { throw new Error() }
    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
});
