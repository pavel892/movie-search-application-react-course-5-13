'use client';

import { useMovies } from '@/app/context/useMovies';
import { ConfigProvider, Rate } from 'antd';
import { useState } from 'react';
import { useSession } from './SessionProvider';

interface RateComponentProps {
  movieId: number;
}

export default function RateComponent({ movieId }: RateComponentProps) {
  const { ratings, setMovies, setRating, removeRating } = useMovies();
  const value = ratings[movieId] || 0;
  const [error, setError] = useState<string | null>(null);
  const { sessionId } = useSession();

  async function fetchRatedMovies(sessionId: string) {
    try {
      const res = await fetch(`api/rated-movies/?sessionId=${sessionId}`);

      const data = await res.json();
      setMovies(data.results || []);

      if (!res.ok) {
        if (res.status === 404) {
          setMovies([]);
          setError('Movies not found');
          return;
        }
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
  }

  async function rateMovie(movieId: number, rating: number) {
    try {
      const res = await fetch(`api/ratings/${movieId}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ rating, sessionId }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      if (sessionId) {
        fetchRatedMovies(sessionId);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
  }

  async function deleteRating(movieId: number) {
    try {
      const res = await fetch(`api/ratings/${movieId}`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      if (sessionId) {
        fetchRatedMovies(sessionId);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
  }

  function handleChange(e: number) {
    if (e === value) {
      deleteRating(movieId);
      removeRating(movieId);
    } else {
      rateMovie(movieId, e);
      setRating(movieId, e);
    }
  }

  if (!sessionId) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {error && <div></div>}
      <ConfigProvider
        theme={{
          components: {
            Rate: {
              starSize: 16,
            },
          },
        }}
      >
        <Rate allowHalf defaultValue={0} count={10} value={value} onChange={handleChange} allowClear={false} />
      </ConfigProvider>
    </>
  );
}
