import * as Cookies from 'js-cookie';

const GITHUB_ACCESS_TOKEN_COOKIE_NAME = 'GITHUB_ACCESS_TOKEN_COOKIE_NAME';

export class Auth {
  public static setAccessToken(token: string) {
    return Cookies.set(GITHUB_ACCESS_TOKEN_COOKIE_NAME, token);
  }
  public static getAccessToken() {
    return Cookies.get(GITHUB_ACCESS_TOKEN_COOKIE_NAME);
  }
}
