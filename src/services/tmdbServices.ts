import dotenv from 'dotenv';
import { TMDBMovieResponse } from '../types/tmdbTypes';
import { MoviesQuery } from '../schemas/tmdbSchemas';

dotenv.config();

const token = process.env.TMDB_TOKEN as string;

export async function filterPopularMovies({
  language,
  page,
  region,
  pageSize,
}: MoviesQuery): Promise<{
  data: TMDBMovieResponse['results'] | null;
  error: {
    statusCode: number;
    msg: string;
  } | null;
}> {
  const url = `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}&region=${region}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  };

  const query = await fetch(url, options);

  if (!query.ok) {
    return {
      data: null,
      error: {
        statusCode: query.status,
        msg: query.statusText,
      },
    };
  }

  const json = (await query.json()) as TMDBMovieResponse;
  const data = json.results.slice(0, pageSize);

  return { data, error: null };
}
