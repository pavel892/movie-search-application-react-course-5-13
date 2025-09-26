import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
