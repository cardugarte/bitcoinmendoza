import { getAllNames } from '../../../../../lib/api-client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { param: string } }
) {
  // Acceder al parámetro de ruta
  const { param } = params;

  const names = await getAllNames();

  // Usar el parámetro para filtrar o modificar la respuesta
  const filteredNames = names.filter((n) => n.name.includes(param));

  const nip05Response = {
    names: filteredNames.reduce((acc: { [key: string]: string }, name) => {
      acc[name.name] = name.npub;
      return acc;
    }, {}),
  };

  return NextResponse.json(nip05Response, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
