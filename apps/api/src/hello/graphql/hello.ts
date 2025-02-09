import { builder } from '~/graphql/builder';

builder.queryField('hello', (t) =>
    t.string({
        description: 'Returns a greeting message',
        resolve: () => 'Hello, Jack!',
    })
);

builder.mutationField('ping', (t) =>
    t.boolean({
        description: 'Returns true as a basic health check',
        resolve: () => true,
    })
);
