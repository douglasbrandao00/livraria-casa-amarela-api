import { SignUpController, SignUpControllerTypes } from 'App/presentation/signup-controller'
import { MissingParamError, InvalidPassword, InvalidParam, ServerError } from 'App/presentation/erros';
import { HttpRequest } from 'App/presentation/protocols/';
import { AddedAccount } from 'App/domain/repository/add-account';

import { 
  EmailValidatorSpy,
  AddAccountStub,
  CheckAccountByEmailRepositoryMock 
} from 'Test/mocks'

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

function makeSut() {

  const emailValidator = new EmailValidatorSpy()
  const checkAccountByEmailRepository = new CheckAccountByEmailRepositoryMock()
  const addAccount = new AddAccountStub()
  
  const sutInput: SignUpControllerTypes = {
    emailValidator,
    addAccount,
    checkAccountByEmailRepository
  }

  const sut = new SignUpController(sutInput)

  return {
    sut,
    emailValidator,
    checkAccountByEmailRepository,
    addAccount
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.name = ''
    const { sut } = makeSut()

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
  test('Should return 400 if no email is provided', async () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.email = ''
    const { sut } = makeSut()

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', async () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.password = ''
    const { sut } = makeSut()

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no confirmPassword is provided', async () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.confirmPassword = ''
    const { sut } = makeSut()

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
  })
  test('Should return 400 if password and confirmPassword are diffrent', async () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.confirmPassword = 'diffrent password'
    const { sut } = makeSut()

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidPassword())
  })
  test('Should return 400 if email is invalid', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, emailValidator } = makeSut()
    emailValidator.isEmailValid = false

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParam('email'))
  })
  test('Should return 500 if email email validator throws', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, emailValidator } = makeSut()
    emailValidator.isValid = () => { throw new Error() }

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 500 if AddAccount.add throws', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, addAccount } = makeSut()
    addAccount.add = async() => new Promise((_) => { throw new Error() })

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Shoud call AddAccount.add with correct data', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, addAccount } = makeSut()
    
    const correctUserCandidateData = {
      name: userCandidate.body.name,
      email: userCandidate.body.email,
      password: userCandidate.body.password,
    }

    await sut.handle(userCandidate)
  
    expect(addAccount.userCandidate).toEqual(correctUserCandidateData)
  })
  test('Shoud call CheckAccountByEmailRepository.check with correct data', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, checkAccountByEmailRepository } = makeSut()
    
    const correctUserCandidateData = {
      name: userCandidate.body.name,
      email: userCandidate.body.email,
      password: userCandidate.body.password,
    }

    await sut.handle(userCandidate)
  
    expect(checkAccountByEmailRepository.input).toEqual(correctUserCandidateData.email)
  }) 
  test('Should return 500 if CheckAccountByEmailRepository.check throws', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, checkAccountByEmailRepository } = makeSut()

    checkAccountByEmailRepository.check = async() => new Promise((_) => { throw new Error() })

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
 test('Should return 400 if email is already registred', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, checkAccountByEmailRepository } = makeSut()
    checkAccountByEmailRepository.output = true

    const httpResponse = await sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParam('email'))
  })

  test('Shoud return 201 when account is created ', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, addAccount } = makeSut()
    
    const createdAccount: AddedAccount = {
      id:  addAccount.createdAccountId,
      name: userCandidate.body.name,
      email: userCandidate.body.email,
    }

    const httpResponse = await sut.handle(userCandidate)
  
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual(createdAccount)
  })
});
