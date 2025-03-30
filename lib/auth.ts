export async function validateApiKey(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return false;

  return token === process.env.NEXT_PUBLIC_INSTANT_API_KEY;
}