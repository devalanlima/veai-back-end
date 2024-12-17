import { z } from 'zod';

export const WatchedQuerySchema = z.object({
  userId: z.string().optional(),
  movieId: z.string().optional(),
  page: z.coerce.number().min(1).max(500).default(1),
  pageSize: z.coerce.number().min(1).max(20).default(20),
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

export type WatchedQuery = z.infer<typeof WatchedQuerySchema>;
