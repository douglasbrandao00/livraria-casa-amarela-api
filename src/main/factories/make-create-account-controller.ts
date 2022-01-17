import {Controller} from "App/presentation/protocols";
import {EmailValidatorAdapter} from 'App/infra/email-validator-adapter'
import {BcryptAdapter} from "root/src/infra/bcrypt-adapter";
import {DbAddAccount, DbAddAccountInput} from "root/src/data/use-cases/db-add-account";
import {SignUpController, SignUpControllerTypes} from "root/src/presentation/signup-controller";
import {AccountRepository} from "root/src/infra/database/mongo/account-repository";

export function makeCreateAccountController(): Controller {
  const ENCRYPTER_SALT = 12
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(ENCRYPTER_SALT)
  const accountRepository = new AccountRepository()

  const addAccountUseCaseInput: DbAddAccountInput = {
    encrypter,
    addAccountRepository: accountRepository
  }

  const dbAddAccount = new DbAddAccount(addAccountUseCaseInput)
  const controllerInput: SignUpControllerTypes = {
    emailValidator,
    addAccount: dbAddAccount,
    checkAccountByEmailRepository: accountRepository
  }
  const controller = new SignUpController(controllerInput)

  return controller
}



