import { ApiClient } from '@pingit/client';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const { CLIENT_ID, CLIENT_SECRET, API_URL } = process.env as Record<string, string>;

function ensureEnvVar(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const apiClient = new ApiClient(
  {
    baseURL: ensureEnvVar("API_URL", API_URL),
    clientId: ensureEnvVar("CLIENT_ID", CLIENT_ID),
    secret: ensureEnvVar("CLIENT_SECRET", CLIENT_SECRET),
  },
  cookies,
);

export type ClientFunctions = {
  [K in keyof ApiClient]: ApiClient[K] extends (...args: any[]) => any ? K : never;
}[keyof ApiClient];

const echo: Mapper<any> = (data: any) => data;

export function createProxy<T = any>(key: ClientFunctions, mapper: Mapper<T> = echo) {
  return async (request: Request) => {
    const body = await request.json();

    const data: Parameters<ApiClient[typeof key]>[0] | undefined = mapper(body);

    const response = (await (apiClient[key] as (...args: any[]) => any)(data)) || {};

    return NextResponse.json(response);
  };
}

type Mapper<T, R = any> = (data: T) => R;
