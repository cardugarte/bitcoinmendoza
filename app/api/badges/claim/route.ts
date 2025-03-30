// import { NextResponse } from 'next/server';
// import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
// import { validateApiKey } from '@/lib/auth';

// // Badge definition
// const BADGE_DEFINITION = {
//   d: 'bitcoin-mendoza-member',
//   name: 'Bitcoin Mendoza Member',
//   description: 'Member of the Bitcoin Mendoza community',
//   image: 'https://bitcoinmendoza.ar/badges/member.png',
//   thumbnails: ['https://bitcoinmendoza.ar/badges/member-thumb.png'],
//   tags: ['bitcoin', 'mendoza', 'community']
// };

// export async function POST(request: Request) {
//   try {
//     // Validate API key
//     const apiKeyValid = await validateApiKey(request);
//     if (!apiKeyValid) {
//       return NextResponse.json(
//         { error: 'Clave API inválida' },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const { nip05, pubkey } = body;

//     let targetPubkey: string | null = null;

//     // Handle NIP-05 claim
//     if (nip05) {
//       if (!nip05.endsWith('@bitcoinmendoza.ar')) {
//         return NextResponse.json(
//           { error: 'Identificador NIP-05 inválido' },
//           { status: 400 }
//         );
//       }

//       const username = nip05.split('@')[0];
//       targetPubkey = await getPublicKeyFromNip05(username);
//     }
//     // Handle direct public key claim
//     else if (pubkey) {
//       targetPubkey = pubkey;
//     }
//     else {
//       return NextResponse.json(
//         { error: 'Se requiere NIP-05 o clave pública' },
//         { status: 400 }
//       );
//     }

//     if (!targetPubkey) {
//       return NextResponse.json(
//         { error: 'No se pudo encontrar la clave pública' },
//         { status: 404 }
//       );
//     }

//     // Create badge award event
//     const signer = new NDKPrivateKeySigner(process.env.NOSTR_BADGE_EMITTER_PRIV!);
//     const event = await createBadgeAwardEvent(signer, targetPubkey);

//     return NextResponse.json({
//       success: true,
//       event
//     });

//   } catch (error) {
//     console.error('Error awarding badge:', error);
//     return NextResponse.json(
//       { error: 'Error interno del servidor' },
//       { status: 500 }
//     );
//   }
// }

// async function getPublicKeyFromNip05(username: string) {
//   try {
//     const response = await fetch(`/.well-known/nostr.json?name=${username}`);
//     const data = await response.json();
//     return data.names[username];
//   } catch (error) {
//     console.error('Error fetching NIP-05:', error);
//     return null;
//   }
// }

// async function createBadgeAwardEvent(signer: NDKPrivateKeySigner, pubkey: string) {
//   const now = Math.floor(Date.now() / 1000);
  
//   const event = {
//     kind: 30009,
//     pubkey: signer.pubkey,
//     created_at: now,
//     tags: [
//       ['d', BADGE_DEFINITION.d],
//       ['name', BADGE_DEFINITION.name],
//       ['description', BADGE_DEFINITION.description],
//       ['image', BADGE_DEFINITION.image],
//       ...BADGE_DEFINITION.thumbnails.map(t => ['thumb', t]),
//       ...BADGE_DEFINITION.tags.map(t => ['t', t]),
//       ['a', `30009:${signer.pubkey}:${BADGE_DEFINITION.d}`],
//       ['p', pubkey]
//     ],
//     content: JSON.stringify(BADGE_DEFINITION)
//   };

//   // Sign the event
//   const signedEvent = await signer.sign(event);
//   return signedEvent;
// }