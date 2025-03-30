import { NextResponse } from 'next/server';
import { checkConnection } from '../../../../lib/db';
import { createName, getName, getAllNames } from '../../../../lib/db-operations';

// Helper function to validate API key
const validateApiKey = (req: Request) => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const apiKey = authHeader.split(' ')[1];
  return apiKey === process.env.NEXT_PUBLIC_INSTANT_API_KEY;
};

export async function POST(req: Request) {
  try {
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    const { name, npub } = await req.json();

    console.log('Received data:', { name, npub });
    console.log('App ID:', process.env.NEXT_PUBLIC_INSTANT_APP_ID);

    if (!name || !npub) {
      return NextResponse.json(
        { error: 'Required parameters (name, npub) are missing' },
        { status: 400 }
      );
    }

    // Check connection status with multiple attempts
    const isConnected = await checkConnection(10);
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Could not establish connection with InstantDB after multiple attempts.' },
        { status: 503 }
      );
    }

    // Create or update the record
    const result = await createName(name, npub);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Endpoint to get a specific record
export async function GET(req: Request) {
  try {
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    const isConnected = await checkConnection(10);
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Could not establish connection with InstantDB after multiple attempts.' },
        { status: 503 }
      );
    }

    // If a name is provided, get that specific record
    if (name) {
      const result = await getName(name);
      return NextResponse.json(result);
    }

    // If no name is provided, get all records
    const allNames = await getAllNames();
    return NextResponse.json(allNames);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}