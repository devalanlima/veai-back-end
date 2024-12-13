import { filterSuggestions } from '../services/suggestionsServices';
import { Request, Response } from 'express';
import { z } from 'zod';
import {
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
