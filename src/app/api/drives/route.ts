import { NextResponse } from 'next/server';
import { getAll } from '../repository/user';

export async function GET(request: Request) {
  // eslint-disable-next-line no-console
  console.log('requesting >', request.url);
  return NextResponse.json(await getAll());
}
