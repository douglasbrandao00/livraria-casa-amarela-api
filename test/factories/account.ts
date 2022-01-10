import { UserAccountCandidate } from 'App/domain/repository/add-account'
import { HttpRequest } from 'App/presentation/protocols/';

export function makeUserCandidate(): UserAccountCandidate {
  return {
    name: 'an_name',
    email: 'any_email@nanana.com',
    password: 'any_password',
  }
}

export function makeUserCandidateRequest(): HttpRequest {
  return {
    body: {
      name: 'an_name',
      email: 'any_email@nanana.com',
      password: 'any_password',
      confirmPassword: 'any_password'
    }
  }
}
