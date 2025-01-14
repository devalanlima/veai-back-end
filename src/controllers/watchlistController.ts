import { z } from 'zod';
import { Request, Response } from 'express';
import {
  InsertWatchlist,
  InsertWatchlistSchema,
  WatchlistQuery,
  WatchlistQuerySchema,
} from '../schemas/watchlistSchemas';
import {
  filterWatchlist,
  insertInWatchlist,
} from '../services/watchlistServices';
import { TablesInsert } from '../types/supabase';

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

export async function insertWatchlist(
  req: Request<{}, {}, TablesInsert<'Watchlist'>>,
  res: Response,
) {
  let body: InsertWatchlist;

  try {
    body = InsertWatchlistSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid body parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data, error, status } = await insertInWatchlist(body);

  if (error) {
    res.json(error).status(status);
    return;
  }

  res.json(data).status(status);
}
