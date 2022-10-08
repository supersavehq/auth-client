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

  return {
    login: requests.login(options.baseUrl, requester),
    register: requests.register(options.baseUrl, requester),
    refresh: requests.refresh(options.baseUrl, requester),
  };
}
