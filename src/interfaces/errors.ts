export class GithubApiError extends Error {
  public readonly errors: GraphQLError[];

  public constructor(errors: GraphQLError[]) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}

interface GraphQLError {
  message: string;
  locations: Location[];
}

interface Location {
  column: number;
  line: number;
}
