import { init } from '@instantdb/react';
import schema from './instant.schema';

if (!process.env.NEXT_PUBLIC_INSTANT_APP_ID) {
  throw new Error('NEXT_PUBLIC_INSTANT_APP_ID is not defined in environment variables.');
}

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID,
  schema: schema
});

// Function to check connection status
export const checkConnection = async (maxAttempts = 5) => {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const status = db._core._reactor.status;
      console.log(`Attempt ${attempts + 1}/${maxAttempts} - Connection status:`, status);
      
      if (status === 'connected') {
        console.log('Successfully connected to InstantDB');
        return true;
      }
      
      if (status === 'error') {
        const error = db._core._reactor._errorMessage || 'Unknown error';
        console.error('Connection error details:', {
          status,
          error,
          appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID
        });
        return false;
      }
      
      // Wait 1 second before next attempt
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    } catch (error) {
      console.error('Error checking connection:', error);
      attempts++;
    }
  }
  
  console.error('Could not establish connection after', maxAttempts, 'attempts');
  return false;
};

// Export a function to get the current connection status
export const getConnectionStatus = () => {
  return db._core._reactor.status;
};

export default db;
