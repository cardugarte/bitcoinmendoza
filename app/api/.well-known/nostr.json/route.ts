import { getAllNames } from '../../../../lib/api-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const names = await getAllNames();

  const nip05Response = {
    names: names.reduce((acc: { [key: string]: string }, name) => {
      acc[name.name] = name.npub;
      return acc;
    }, {})
  };
  return NextResponse.json(nip05Response, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}