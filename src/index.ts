import { getRequester } from './http-requester';
import type { Options, Client } from './types';
export {
  Requester,
  HttpResponse,
  Options,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
  RegistrationRequest,
  RegistrationResponse,
} from './types';
import * as requests from './requests';

export async function initialize(options: Options): Promise<Client> {
  const requester = await getRequester(options);

  const rawBaseUrl = options.baseUrl;
  const baseUrl =
    rawBaseUrl.charAt(rawBaseUrl.length) === '/'
      ? rawBaseUrl.slice(0, Math.max(0, rawBaseUrl.length - 1))
      : rawBaseUrl;

  return {
    login: requests.login(baseUrl, requester),
    register: requests.register(baseUrl, requester),
    refresh: requests.refresh(baseUrl, requester),
  };
}
