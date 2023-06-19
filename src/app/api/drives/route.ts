import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // eslint-disable-next-line no-console
  console.log('requesting >', request.url);
  return NextResponse.json({ drives: [{ id: 1, dest: 'tel aviv' }] });
}
