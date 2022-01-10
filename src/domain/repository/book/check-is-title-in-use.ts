export interface CheckIsTitleInUseRepository {
  check(title: string): Promise<boolean>
}
