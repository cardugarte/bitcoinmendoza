import { NextResponse } from 'next/server';
import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { method, pubkey } = body;

    if (!pubkey) {
      return NextResponse.json(
        { error: 'Se requiere la clave pública' },
        { status: 400 }
      );
    }

    // Verify that the pubkey matches the admin pubkey
    if (pubkey !== process.env.NEXT_PUBLIC_ADMIN_PUBKEY) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (method === 'privateKey') {
      // If using private key, verify it matches
      const signer = new NDKPrivateKeySigner(process.env.NOSTR_BADGE_EMITTER_PRIV!);
      if (signer.pubkey !== pubkey) {
        return NextResponse.json(
          { error: 'Clave privada inválida' },
          { status: 401 }
        );
      }

      // Set session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    // For Alby method, create a challenge event
    const signer = new NDKPrivateKeySigner(process.env.NOSTR_BADGE_EMITTER_PRIV!);
    const now = Math.floor(Date.now() / 1000);
    
    const challenge = Math.random().toString(36).substring(2);
    
    const event = {
      kind: 22242, // Challenge event kind
      pubkey: signer.pubkey,
      created_at: now,
      tags: [
        ['challenge', challenge],
        ['p', pubkey]
      ],
      content: 'Por favor, firma este evento para autenticarte'
    };

    // Sign the event
    const signedEvent = await signer.sign(event);

    return NextResponse.json({
      success: true,
      event: signedEvent,
      challenge
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 