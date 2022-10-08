import type { Options, Requester } from '../types';
import { fetchRequester } from './fetch';

export async function getRequester(options: Options): Promise<Requester> {
  if (options.requester) {
    return options.requester;
  }

  return fetchRequester;
}
