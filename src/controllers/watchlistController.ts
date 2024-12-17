import { z } from 'zod';
import { Request, Response } from 'express';
import {
  WatchlistQuery,
  WatchlistQuerySchema,
} from '../schemas/watchlistSchemas';
import { filterWatchlist } from '../services/watchlistServices';

export async function getWatchlist(req: Request, res: Response) {
  let query: WatchlistQuery;

  try {
    query = WatchlistQuerySchema.parse(req.query);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid query parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data: watchlist, error, status } = await filterWatchlist(query);

  if (watchlist?.length === 0) {
    res.status(200).json({
      msg: 'No items found',
      data: watchlist,
    });
    return;
  }

  if (error) {
    res.status(status).json({ msg: error.message });
    return;
  } else {
    res.status(status).json(watchlist);
    return;
  }
}
