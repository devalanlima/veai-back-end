import { number, z } from 'zod';

const orders = ['created_at', 'vote_count'] as const;

export const SuggestionsQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).optional().default(10),
  movieId: z.coerce.number().min(1).optional(),
  orderBy: z.enum(orders).optional().default('created_at'),
  ascending: z
    .preprocess((value) => {
      if (value === 'true' || value === 'TRUE') return true;
      if (value === 'false' || value === 'FALSE') return false;
      return value;
    }, z.boolean())
    .optional()
    .default(false),
  genres: z
    .string()
    .transform((str) =>
      str
        .split(',')
        .map((item) => Number(item))
        .filter((item) => !isNaN(item) && item !== 0),
    )
    .refine((array) => array.length > 0, {
      message: 'Genres must contain only valid IDs',
    })
    .optional(),
});

export const InsertSuggestionSchema = z.object({
  sender_id: z.string(),
  receiver_id: z.string(),
  created_at: z.string(),
  suggestion: z.string(),
  movie_id: z.number().min(1),
  spoiler: z.boolean(),
  genres: z.array(z.number().int()).transform((values) => values.map(String)),
});

export type SuggestionsQuery = z.infer<typeof SuggestionsQuerySchema>;
export type InsertSuggestion = z.infer<typeof InsertSuggestionSchema>;
