import db from './db';

// Create or update a name record
export const createName = async (name: string, npub: string) => {

  await db.tx.names[name].update({
    name,
    npub
  });

  return `Name created: ${name} ${npub}`;
};

// Get a specific name record
export const getName = async (name: string) => {
  const query = { names: { name } };
  const { names } = await db.query(query);
  console.log(names, 'names');
  return names;
};

// Get all name records
export const getAllNames = async () => {
  const query = { names: {} };
  const { names } = await db.query(query);
  console.log(names, 'names');
  console.log(db.tx.names, 'db.tx.names');
  return names;
};