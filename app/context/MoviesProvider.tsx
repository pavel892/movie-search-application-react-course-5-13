'use client';
import { useEffect, useState } from 'react';
import { MoviesContext } from './MoviesContext';

interface MovieObject {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface GenreObject {
  id: number;
  name: string;
}

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [genres, setGenres] = useState<GenreObject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch('api/genres');
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setGenres(data.genres);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      }
    }
    fetchGenres();
  }, []);

  const setRating = (movieId: number, value: number) => {
    setRatings((prev) => {
      const updated = { ...prev, [movieId]: value };
      localStorage.setItem('guest_ratings', JSON.stringify(updated));
      return updated;
    });
  };

  const removeRating = (movieId: number) => {
    setRatings((prev) => {
      const updated = { ...prev };
      delete updated[movieId];
      localStorage.setItem('guest_ratings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <MoviesContext.Provider value={{ movies, setMovies, genres, error, ratings, setRating, removeRating }}>
      {children}
    </MoviesContext.Provider>
  );
};
