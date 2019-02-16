import { isUndefined } from 'lodash-es';
import { Auth } from './Auth';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

enum Method {
  POST = 'post',
}

const defaultHeaders: () => HeadersInit = () => {
  const accessToken = Auth.getAccessToken();
  const dirtyHeaders = {
    Accept: 'application/json',
    Authorization: accessToken ? `bearer ${accessToken}` : undefined,
    'Content-Type': 'application/json',
  };
  return Object.keys(dirtyHeaders).reduce((acc, key) => {
    const value = dirtyHeaders[key];
    return isUndefined(value)
      ? acc
      : {
          ...acc,
          [key]: value,
        };
  }, {});
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
