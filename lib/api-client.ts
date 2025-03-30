import { id } from '@instantdb/react';
import db from './db';

// Create or update a name record
export const createName = async (name: string, npub: string) => {
  // Check if name already exists
  const query = { names: {} };
  const { names } = await db.query(query);
  const existingName = names.find(n => n.name === name);
  if (existingName) {
    throw new Error('Este nombre de usuario ya está registrado.');
  }

  // If name doesn't exist, create new record
  db.transact(db.tx.names[id()].update({ name, npub }));
  return `Name created: ${name} ${npub}`;
};

// Get a specific name record
export const getName = async (name: string) => {
  const query = { names: { name } };
  const { names } = await db.query(query);
  return names;
};

// Get all name records
export const getAllNames = async () => {
    const query = { names: {} };
    const { names } = await db.query(query);
    return names || [];
};

// Check if username is available
export const isUsernameAvailable = async (name: string): Promise<boolean> => {
  const query = { names: {} };
  const { names } = await db.query(query);
  return !names.some(n => n.name === name);
};