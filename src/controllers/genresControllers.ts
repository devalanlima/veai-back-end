import { Request, Response } from 'express';
import { z } from 'zod';
import { filterGenres } from '../services/genresServices';
import { GenresQuery, GenresQuerySchema } from '../schemas/genresSchemas';

export async function getGenres(req: Request, res: Response) {
  let query: GenresQuery;

  try {
    query = GenresQuerySchema.parse(req.query);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid query parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data: genres, error, status } = await filterGenres(query);

  if (genres?.length === 0) {
    res.status(200).json({
      msg: 'No items found',
      data: genres,
    });
    return;
  }

  if (error) {
    res.status(status).json({ msg: error.message });
    return;
  } else {
    res.status(status).json(genres);
    return;
  }
}
