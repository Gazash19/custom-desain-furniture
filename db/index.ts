import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const SUPABASE_DEFAULT_URL = 'postgresql://postgres.kqabsmixuuvvjfhaynhv:pYq%2B%405XA3mWF%2AFr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const connectionString = (process.env.DATABASE_URL || '').trim() || SUPABASE_DEFAULT_URL;

// Use global singleton in development to prevent connection exhaustion in Next.js hot-reloading
declare global {
  // eslint-disable-next-line no-var
  var _postgresClient: postgres.Sql | undefined;
}

export const client = globalThis._postgresClient || postgres(connectionString, { 
  prepare: false, 
  ssl: 'require',
  max: 5,
  idle_timeout: 15,
  connect_timeout: 15
});

if (process.env.NODE_ENV !== 'production') {
  globalThis._postgresClient = client;
}

export const db = drizzle(client, { schema });

