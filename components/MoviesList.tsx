import MovieCard from './MovieCard';
import PaginationComponent from './Pagination';

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

const accessToken = process.env.ACCESS_TOKEN;

async function fetchMovies(currentPage: number) {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`, {
    next: { revalidate: 86400 },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}

async function searchMovies(currentPage: number, query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${currentPage}&query=${query}`,
    {
      cache: 'no-store',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}

export default async function MoviesList({ currentPage, query }: { currentPage: number; query: string }) {
  const queryValue = query;
  let movies: MovieObject[];

  if (queryValue === '') {
    movies = await fetchMovies(currentPage);
  } else {
    movies = await searchMovies(currentPage, query);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[388px] md:w-[92%] lg:w-[988px]">
          <div className="lg:grid lg:grid-cols-[48%_48%] lg:gap-x-[4%] md:grid md:grid-cols-[48%_48%] md:gap-x-[4%] mt-2.5 md:mt-[34px] lg:mt-[34px]">
            {movies.length !== 0 ? (
              movies.map((movie) => {
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
              })
            ) : (
              <div className="col-span-full row-span-full flex items-center justify-center mb-[37px]">
                No results for: {query}
              </div>
            )}
          </div>
        </div>
      </div>
      <PaginationComponent currentPage={currentPage} query={query} totalPages={5} />
    </>
  );
}
