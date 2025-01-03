import {
  InsertWatched,
  InsertWatchedSchema,
  WatchedQuery,
  WatchedQuerySchema,
} from '../schemas/watchedSchemas';
import { filterWatched, insertNewWatched } from '../services/watchedServices';
import { z } from 'zod';
import { Request, Response } from 'express';
import { TablesInsert } from '../types/supabase';

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

export async function insertWatched(
  req: Request<{}, {}, TablesInsert<'Watched'>>,
  res: Response,
) {
  let body: InsertWatched;

  try {
    body = InsertWatchedSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid body parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data, error, status } = await insertNewWatched(body);

  if (error) {
    res.json(error).status(status);
    return;
  }

  res.json(data).status(status);
}
