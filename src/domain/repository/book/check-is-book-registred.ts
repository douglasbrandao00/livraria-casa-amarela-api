export interface CheckIsBookRegistredRepository {
  check(title: string): Promise<boolean>
}
