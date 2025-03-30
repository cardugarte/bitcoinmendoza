import db from './db';

// Create a new record
export const createName = async (name: string, npub: string) => {
  try {
    await db.tx.names[name].update({
      name,
      npub,
    });
    return { success: true, name, npub };
  } catch (error) {
    console.error('Error creating name:', error);
    throw error;
  }
};

// Get a record by name
export const getName = async (name: string) => {
  try {
    const result = await db.tx.names[name];
    return result;
  } catch (error) {
    console.error('Error getting name:', error);
    throw error;
  }
};

// Get all records
export const getAllNames = async () => {
  try {
    const result = await db.tx.names;
    return result;
  } catch (error) {
    console.error('Error getting all names:', error);
    throw error;
  }
};

// Delete a record
export const deleteName = async (name: string) => {
  try {
    await db.tx.names[name].delete();
    return { success: true, name };
  } catch (error) {
    console.error('Error deleting name:', error);
    throw error;
  }
};