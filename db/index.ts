import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

// Use global singleton in development to prevent connection exhaustion in Next.js hot-reloading
declare global {
  // eslint-disable-next-line no-var
  var _postgresClient: postgres.Sql | undefined;
}

export const client = globalThis._postgresClient || postgres(connectionString, { 
  prepare: false, 
  ssl: 'require',
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10
});

if (process.env.NODE_ENV !== 'production') {
  globalThis._postgresClient = client;
}

export const db = drizzle(client, { schema });
