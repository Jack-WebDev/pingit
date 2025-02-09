import { ApiClient } from '@pingit/client';

import type { ClientFunctions } from './server-proxy';

export async function executeApi<T extends ClientFunctions>(
    action: T,
    input: Parameters<ApiClient[T]>[0]
): Promise<Awaited<ReturnType<ApiClient[T]>>> {
    const response = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: action,
            input,
        }),
    });

    if (!response.ok) {
        const error = await response.json();

        const message = Array.isArray(error)
            ? `${error[0].message} [${error[0].path.join(',')}] `
            : error.message;

        throw new Error(message);
    }

    const data = await response.json();

    return data;
}
