export declare abstract class BaseRepository<TModel, TCreate, TUpdate> {
    protected readonly client: unknown;
    protected constructor(client: unknown);
    protected execute<TResult>(operation: () => Promise<TResult>): Promise<TResult>;
}
