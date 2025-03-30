import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // TODO: Verify session token with admin pubkey
    const isAuthenticated = true;

    return NextResponse.json({ isAuthenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}