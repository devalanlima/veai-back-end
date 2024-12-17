import { WatchedQuery, WatchedQuerySchema } from '../schemas/watchedSchemas';
import { filterWatched } from '../services/watchedServices';
import { z } from 'zod';
import { Request, Response } from 'express';

export async function getWatched(req: Request, res: Response) {
  let query: WatchedQuery;

  try {
    query = WatchedQuerySchema.parse(req.query);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid query parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data: watched, error, status } = await filterWatched(query);

  if (watched?.length === 0) {
    res.status(200).json({
      msg: 'No items found',
      data: watched,
    });
    return;
  }

  if (error) {
    res.status(status).json({ msg: error.message });
    return;
  } else {
    res.status(status).json(watched);
    return;
  }
}
