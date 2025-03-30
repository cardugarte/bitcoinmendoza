import { i } from '@instantdb/react';

const schema = i.schema({
  entities: {
    names: i.entity({
      id: i.string().unique(),
      name: i.string().unique(), // Unique username (e.g., "user")
      npub: i.string(),        // Nostr public key (e.g., "npub1...")
    }),
  },
});

// console.log('schema:', schema);

export default schema;