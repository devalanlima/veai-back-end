import { Request, Response } from 'express';
import { z } from 'zod';
import { filterPopularMovies } from '../services/tmdbServices';
import { MoviesQuery, PopularMoviesQuerySchema } from '../schemas/tmdbSchemas';

export async function getPopularMovies(
  req: Request<{}, {}, {}, MoviesQuery>,
  res: Response,
) {
  let query;

  try {
    query = PopularMoviesQuerySchema.parse(req.query);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid query parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data, error } = await filterPopularMovies(query);

  if (error) {
    res.status(error.statusCode).json({ msg: error.msg });
    return;
  }

  res.status(200).json({ data });
}
