import { init } from '@instantdb/admin';
import schema from './instant.schema';

if (!process.env.NEXT_PUBLIC_INSTANT_APP_ID) {
  throw new Error('NEXT_PUBLIC_INSTANT_APP_ID is not defined in environment variables.');
}

if (!process.env.NEXT_PUBLIC_INSTANT_API_KEY) {
  throw new Error('NEXT_PUBLIC_INSTANT_API_KEY is not defined in environment variables.');
}

const NEXT_PUBLIC_INSTANT_API_KEY = process.env.NEXT_PUBLIC_INSTANT_API_KEY || '';
const NEXT_PUBLIC_INSTANT_APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || '';

const db = init({
  appId: NEXT_PUBLIC_INSTANT_APP_ID,
  schema: schema,
  adminToken: NEXT_PUBLIC_INSTANT_API_KEY
});

export default db;
