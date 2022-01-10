import { EmailValidator } from 'App/presentation/protocols/';

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true
  isValid(_email: string): boolean {
    return this.isEmailValid
  }
}

