import {
  filterSuggestions,
  insertNewSuggestion,
} from '../services/suggestionsServices';
import { Request, Response } from 'express';
import { z } from 'zod';
import {
  InsertSuggestion,
  InsertSuggestionSchema,
  SuggestionsQuery,
  SuggestionsQuerySchema,
} from '../schemas/suggestionsSchemas';

export async function getSuggestions(req: Request, res: Response) {
  let query: SuggestionsQuery;
  try {
    query = SuggestionsQuerySchema.parse(req.query);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid query parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data: suggestions, error, status } = await filterSuggestions(query);

  if (error) {
    res.status(status).json({
      errors: error,
    });
    return;
  }

  res.status(status).json(suggestions);
}

export async function insertSuggestion(req: Request, res: Response) {
  let body: InsertSuggestion;

  try {
    body = InsertSuggestionSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({
      msg: 'Invalid body parameters',
      errors: error instanceof z.ZodError ? error.issues : 'Validation error',
    });
    return;
  }

  const { data, error, status } = await insertNewSuggestion(body);

  if (error) {
    res.json(error).status(status);
    return;
  }

  res.json(data).status(status);
}
