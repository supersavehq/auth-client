import type {
  Requester,
  DoResetPasswordRequest,
  DoResetPasswordDataResponse,
  DoResetPasswordResponse,
} from '../types';

export const doResetPassword =
  (baseUrl: string, requester: Requester) =>
  async (request: DoResetPasswordRequest): Promise<DoResetPasswordResponse> => {
    const rsp = await requester.post<
      DoResetPasswordDataResponse,
      DoResetPasswordRequest
    >(`${baseUrl}/do-reset-password`, request);

    return rsp.data.data;
  };
