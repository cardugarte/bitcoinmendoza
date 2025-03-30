import { init } from '@instantdb/admin';
import schema from './instant.schema';

if (!process.env.INSTANT_APP_ID) {
  throw new Error('INSTANT_APP_ID is not defined in environment variables.');
}

if (!process.env.INSTANT_API_KEY) {
  throw new Error('INSTANT_API_KEY is not defined in environment variables.');
}

const INSTANT_API_KEY = process.env.INSTANT_API_KEY || '';
const INSTANT_APP_ID = process.env.INSTANT_APP_ID || '';

const db = init({
  appId: INSTANT_APP_ID,
  schema: schema,
  adminToken: INSTANT_API_KEY
});

export default db;
