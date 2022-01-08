export class InvalidParam extends Error {
  constructor(param: string) {
    super(`invalid param: ${param}`)
  }
}
