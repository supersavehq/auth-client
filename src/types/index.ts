export type HttpResponse<T> = {
  statusCode: number;
  data: T;
};

export interface Requester {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T, D = any>(
    url: string,
    data?: D | undefined
  ) => Promise<HttpResponse<T>>;
}

export type Options = {
  baseUrl: string;
  requester?: Requester;
};

export type Client = {
  login: (request: LoginRequest) => Promise<LoginResponse>;
  register: (request: RegistrationRequest) => Promise<RegistrationResponse>;
  refresh: (request: RefreshRequest) => Promise<RefreshResponse>;
};

/** HTTP response types */
/** These are partially copied from https://github.com/supersavehq/auth/blob/main/src/types/index.ts */

type HttpDataResponse<T> = { data: T };

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  authorized: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type LoginDataResponse = HttpDataResponse<LoginResponse>;

export type ErrorResponse = {
  message: string;
};

export type RefreshToken = {
  id: string;
  userId: string;
  expiresAt: number;
};

export type RegistrationRequest = {
  email: string;
  password: string;
  name?: string;
};
export type RegistrationResponseFailed = {
  success: false;
  message: string;
};
export type RegistrationResponseSuccess = {
  success: true;
  accessToken?: string;
  refreshToken?: string;
};

export type RegistrationResponse =
  | RegistrationResponseFailed
  | RegistrationResponseSuccess;

export type RegistrationDataResponse = HttpDataResponse<RegistrationResponse>;

export type RefreshRequest = {
  token: string;
};
export type RefreshResponse = {
  success: boolean;
  accessToken?: string;
};
export type RefreshDataResponse = HttpDataResponse<RefreshResponse>;
