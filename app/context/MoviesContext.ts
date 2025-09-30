'use client';
import { createContext } from 'react';

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

export const MoviesContext = createContext<{
  movies: MovieObject[];
  setMovies: React.Dispatch<React.SetStateAction<MovieObject[]>>;
  genres: GenreObject[];
  error: string | null;
  ratings: Record<number, number>;
  setRating: (movieId: number, value: number) => void;
  removeRating: (movieId: number) => void;
} | null>(null);
