export abstract class BaseRepository<TModel, TCreate, TUpdate> {
  protected constructor(protected readonly client: unknown) {}

  protected async execute<TResult>(operation: () => Promise<TResult>): Promise<TResult> {
    return operation();
  }
}
