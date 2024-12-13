import { z } from 'zod';

const orders = ['created_at', 'vote_count'] as const;

export const SuggestionsQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).optional().default(10),
  movieId: z.coerce.number().min(1).optional(),
  order: z.enum(orders).optional().default('created_at'),
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

export type SuggestionsQuery = z.infer<typeof SuggestionsQuerySchema>;
