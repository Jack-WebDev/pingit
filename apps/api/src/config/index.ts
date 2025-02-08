import { env } from '@pingit/serverkit';

import { baseConfig } from './base';
import { databaseConfig } from './db';

const builder = {
  ...baseConfig,
  version: env.get('VERSION').asString(),
  http: {
    host: env.get('HOST').asString(),
    port: env.get('SERVER_PORT').default(8080).asPortNumber(),
  },
  db: databaseConfig,
  // cache: {
  //   uri: env.get('CACHE_URL').required().asString(),
  // },
  mail: {
    fromEmail: env.get('MAIL_FROM_EMAIL').required().asString(),
    host: env.get('MAIL_HOST').required().asString(),
    port: env.get('MAIL_PORT').required().asPortNumber(),
    secure: env.get('MAIL_SECURE').default('false').asBoolStrict(),
    user: env.get('MAIL_USER').asString(),
    password: env.get('MAIL_PASSWORD').asString(),
  },
  // attachments: {
  //   accessKeyId: env.get('ATTACHMENTS_ACCESS_KEY_ID').asString(),
  //   bucket: env.get('ATTACHMENTS_BUCKET_NAME').required().asString(),
  //   secretAccessKey: env.get('ATTACHMENTS_SECRET_KEY').asString(),
  //   url: env.get('ATTACHMENTS_QUEUE_URL').asString(),
  //   endpoint: env.get('ATTACHMENTS_ENDPOINT').asString(),
  //   region: env.get('ATTACHMENTS_REGION').required().asString(),
  // },
  // account: {
  //   verifySecret: env.get('VERIFY_SECRET').required().asString(),
  // },
  domain: {
    name: env.get('DOMAIN_NAME').required().asString(),
  },
};

export const config = Object.freeze(builder);
export type Config = typeof builder;
export type Stage = Config['stage'];
