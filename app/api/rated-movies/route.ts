import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${process.env.API_KEY}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
