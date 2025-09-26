import { useContext } from 'react';
import { MoviesContext } from './MoviesContext';

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error('Context error');
  return context;
};
