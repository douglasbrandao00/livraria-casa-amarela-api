import { SignUpController, SignUpControllerTypes } from '../src/presentation/SignUpController'
import {MissingParamError, InvalidPassword, InvalidParam, ServerError } from '../src/presentation/erros';
import {HttpRequest, EmailValidator} from './presentation/protocols/';
import {AddAccount, AddedAccount, UserAccountCandidate} from './domain/use-cases/add-account';

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

class AddAccountStub implements AddAccount {
  userCandidate?: UserAccountCandidate
  createdAccountId = 'any_id'
  /*async add(candidate: UserAccountCandidate): Promise<AddedAccount> {
      this.userCandidate = candidate
      const createdAccount = Object.assign({}, candidate, {id: this.createdAccountId})
      return new Promise(resolve => resolve(createdAccount as AddedAccount))
  }*/
  add(candidate: UserAccountCandidate): AddedAccount {
      this.userCandidate = candidate
      const createdAccount = Object.assign({}, candidate, {id: this.createdAccountId})
      return createdAccount as AddedAccount
  }
}

function makeSut() {

  const emailValidator = new EmailValidatorSpy()
  const addAccount = new AddAccountStub()
  
  const sutInput: SignUpControllerTypes = {
    emailValidator,
    addAccount
  }

  const sut = new SignUpController(sutInput)

  return {
    sut,
    emailValidator,
    addAccount
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.name = ''
    const { sut } = makeSut()

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
  test('Should return 400 if no email is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.email = ''
    const { sut } = makeSut()

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.password = ''
    const { sut } = makeSut()

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no confirmPassword is provided', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.confirmPassword = ''
    const { sut } = makeSut()

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
  })
  test('Should return 400 if password and confirmPassword are diffrent', () => {
    const userCandidate = makeUserCandidate()
    userCandidate.body.confirmPassword = 'diffrent password'
    const { sut } = makeSut()

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidPassword())
  })
  test('Should return 400 if email is invalid', () => {
    const userCandidate = makeUserCandidate()
    const { sut, emailValidator } = makeSut()
    emailValidator.isEmailValid = false

    const httpResponse = sut.handle(userCandidate)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParam('email'))
  })
  test('Should return 500 if email email validator throws', () => {
    const userCandidate = makeUserCandidate()
    const { sut, emailValidator } = makeSut()
    emailValidator.isValid = () => { throw new Error() }

    const httpResponse = sut.handle(userCandidate)

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
  test('Shoud return 201 when account is created ', async () => {
    const userCandidate = makeUserCandidate()
    const { sut, addAccount } = makeSut()
    
    const createdAccount: AddedAccount = {
      id:  addAccount.createdAccountId,
      name: userCandidate.body.name,
      email: userCandidate.body.email,
      password: userCandidate.body.password,
    }

    const httpResponse =   sut.handle(userCandidate)
  
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual(createdAccount)
  })
});
