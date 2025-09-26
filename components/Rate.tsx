'use client';

import { useMovies } from '@/app/context/useMovies';
import { ConfigProvider, Rate } from 'antd';
import { useEffect, useState } from 'react';

interface RateComponentProps {
  movieId: number;
}

const sessionId = localStorage.getItem('sessionId');

export default function RateComponent({ movieId }: RateComponentProps) {
  const [value, setValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { setMovies } = useMovies();

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

  useEffect(() => {
    const ratings = JSON.parse(localStorage.getItem('guest_ratings') || '{}');
    if (ratings[movieId]) {
      setValue(ratings[movieId]);
    }
  }, [movieId]);

  function handleChange(e: number) {
    if (e === value) {
      deleteRating(movieId);
      setValue(0);
      const ratings = JSON.parse(localStorage.getItem('guest_ratings') || '{}');
      delete ratings[movieId];
      localStorage.setItem('guest_ratings', JSON.stringify(ratings));
    } else {
      rateMovie(movieId, e);
      setValue(e);
      const ratings = JSON.parse(localStorage.getItem('guest_ratings') || '{}');
      ratings[movieId] = e;
      localStorage.setItem('guest_ratings', JSON.stringify(ratings));
    }
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
