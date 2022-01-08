export class InvalidPassword extends Error {
  constructor() {
    super(`password and confirmPassword should be equals`)
    this.name= 'InvalidPassword'
  }
}
