import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const query = searchParams.get('query') || 'SELECT * FROM ' + table;
    const params = searchParams.get('params') ? JSON.parse(searchParams.get('params')!) : [];

    if (!table) {
      return NextResponse.json({ error: 'Table name is required' }, { status: 400 });
    }

    const database = await db;
    const result = await database.all(query, params);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { table, query, params } = await request.json();

    if (!table || !query) {
      return NextResponse.json({ error: 'Table name and query are required' }, { status: 400 });
    }

    const database = await db;
    const result = await database.run(query, params || []);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
} 