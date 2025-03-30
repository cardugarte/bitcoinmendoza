import { NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/auth';
import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';

// Admin public key for Bitcoin Mendoza
const ADMIN_PUBKEY = process.env.NOSTR_BADGE_EMITTER_PUB!;

export async function POST(request: Request) {
  try {
    // Validate API key
    const apiKeyValid = await validateApiKey(request);
    if (!apiKeyValid) {
      return NextResponse.json(
        { error: 'Clave API inválida' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, image, thumbnails, tags } = body;

    // Validate required fields
    if (!name || !description || !image || !tags) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Create badge definition event
    const signer = new NDKPrivateKeySigner(process.env.NOSTR_BADGE_EMITTER_PRIV!);
    const now = Math.floor(Date.now() / 1000);
    
    const badgeDefinition = {
      d: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      image,
      thumbnails: thumbnails || [],
      tags
    };

    const event = {
      kind: 30009,
      pubkey: signer.pubkey,
      created_at: now,
      tags: [
        ['d', badgeDefinition.d],
        ['name', badgeDefinition.name],
        ['description', badgeDefinition.description],
        ['image', badgeDefinition.image],
        ...(badgeDefinition.thumbnails || []).map((t: string) => ['thumb', t]),
        ...badgeDefinition.tags.map((t: string) => ['t', t]),
        ['a', `30009:${signer.pubkey}:${badgeDefinition.d}`]
      ],
      content: JSON.stringify(badgeDefinition)
    };

    // Sign the event
    const signedEvent = await signer.sign(event);

    return NextResponse.json({
      success: true,
      event: signedEvent
    });

  } catch (error) {
    console.error('Error creating badge:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 