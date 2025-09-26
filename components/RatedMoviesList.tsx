'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useMovies } from '@/app/context/useMovies';

export default function RatedMoviesList() {
  const { movies, setMovies } = useMovies();
  const [error, setError] = useState<string | null>(null);
  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    setError(null);
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
    if (sessionId) {
      fetchRatedMovies(sessionId);
    }
  }, [sessionId, setMovies]);
  return (
    <div className="flex justify-center">
      <div className="w-[388px] md:w-[92%] lg:w-[988px]">
        <div className="lg:grid lg:grid-cols-[48%_48%] lg:gap-x-[4%] md:grid md:grid-cols-[48%_48%] md:gap-x-[4%] mt-2.5 md:mt-[34px] lg:mt-[34px]">
          {error && error}
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                image={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                date={movie.release_date}
                description={movie.overview}
                movieId={movie.id}
                genreIds={movie.genre_ids}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
