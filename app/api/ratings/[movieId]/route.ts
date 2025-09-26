import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { movieId: string } }) {
  const { movieId } = params;
  const { rating, sessionId } = await req.json();
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.API_KEY}&guest_session_id=${sessionId}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ value: rating }),
    }
  );

  const data = await res.json();

  return NextResponse.json({ success: true, data });
}

export async function DELETE(req: Request, { params }: { params: { movieId: string } }) {
  const { movieId } = params;
  const { sessionId } = await req.json();

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.API_KEY}&guest_session_id=${sessionId}`,
    {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json({ success: true, data });
}
