import { isUndefined, omitBy } from 'lodash-es';
import { Auth } from './Auth';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const enum Method {
  POST = 'post',
}

const defaultHeaders: () => HeadersInit = () => {
  const accessToken = Auth.getAccessToken();
  return omitBy(
    {
      Accept: 'application/json',
      Authorization: accessToken ? `bearer ${accessToken}` : undefined,
      'Content-Type': 'application/json',
    },
    isUndefined,
  );
};

const buildPayload = (options: RequestInit) => ({
  ...options,
  headers: {
    ...defaultHeaders(),
    ...options.headers,
  },
  method: Method.POST,
});

export default class GithubApi {
  public static call(query: string, options: RequestInit = {}) {
    return fetch(
      GITHUB_GRAPHQL_ENDPOINT,
      buildPayload({
        ...options,
        body: JSON.stringify({ query }),
      }),
    );
  }
}
