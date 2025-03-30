const API_BASE_URL = '/api/.well-known/nostr.json';

// Helper function to get headers with authentication
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INSTANT_API_KEY}`
});

// Create or update a name record
export const createName = async (name: string, npub: string) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, npub })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create name');
  }

  return response.json();
};

// Get a specific name record
export const getName = async (name: string) => {
  const response = await fetch(`${API_BASE_URL}?name=${encodeURIComponent(name)}`, {
    headers: getHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get name');
  }

  return response.json();
};

// Get all name records
export const getAllNames = async () => {
  const response = await fetch(API_BASE_URL, {
    headers: getHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get all names');
  }

  return response.json();
}; 